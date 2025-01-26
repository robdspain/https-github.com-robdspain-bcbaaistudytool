import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Generate question function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mainTopic, subtopic } = await req.json();
    console.log('Generating question for:', { mainTopic, subtopic });

    const prompt = `You're an expert behavior analyst with over 20 years of experience, focused on creating advanced materials for behavior analysts preparing for their BCBA exam, specifically targeting those with a master's degree or higher. Your expertise lies in crafting challenging, nuanced, and sophisticated multiple-choice questions that reflect the rigor of Ph.D.-level understanding, incorporating complex scenarios, ethical dilemmas, and advanced applications of behavior analysis principles. These questions are framed within practical contexts such as schools, clinical settings, and other applied environments, pushing users to demonstrate a deep mastery of concepts. Questions require critical thinking, the ability to analyze detailed scenarios, and a thorough grasp of theoretical and applied behavior analysis principles, including advanced ethical considerations, experimental design, and implementation strategies. Additionally, you adhere to the professional standards set by the BACB - Behavior Analyst Certification Board. Questions must align with real-world application and professional conduct as outlined by the BACB. When crafting questions, you may draw inspiration from sample formats provided but never replicate them directly, ensuring all questions reflect original and refined critical thinking. All questions must be concise and limited to 4-5 sentences in length.

Generate ONE multiple-choice quiz question related to ${subtopic} within the context of ${mainTopic} that implicitly assess the learner's ability to recognize relationships between concepts. Use principles of relational frame theory (such as coordination, comparison, causality, and temporal relations) without explicitly mentioning them. The questions should challenge the learner to identify relationships between stimuli, infer logical connections, and apply behavioral principles flexibly.

IMPORTANT: You must respond with EXACTLY ONE properly formatted JSON object containing a single question. Do not include any text before or after the JSON object. Do not include multiple questions. Follow this EXACT format for the response:

{
  "question": "Write a clear, concise question here",
  "options": [
    "A) First option",
    "B) Second option",
    "C) Third option",
    "D) Fourth option"
  ],
  "correctAnswer": "A",
  "explanation": "Detailed explanation of why the correct answer is right and how it relates to the principles being tested"
}`;

    console.log('Sending request to OpenAI...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a BCBA exam question generator. You must respond with EXACTLY ONE properly formatted JSON object containing a single question. Do not include any text before or after the JSON object. Do not include multiple questions.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate question from OpenAI');
    }

    const data = await response.json();
    console.log('OpenAI Response:', JSON.stringify(data, null, 2));

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response structure from OpenAI:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response from OpenAI');
    }

    let parsedQuestion;
    try {
      const content = data.choices[0].message.content.trim();
      console.log('Raw response content:', content);
      
      // Find the first complete JSON object in the response
      const firstBrace = content.indexOf('{');
      const lastBrace = content.indexOf('}') + 1;
      if (firstBrace === -1 || lastBrace === 0) {
        throw new Error('No valid JSON object found in response');
      }
      
      const jsonContent = content.substring(firstBrace, lastBrace);
      console.log('Extracted JSON content:', jsonContent);
      
      parsedQuestion = JSON.parse(jsonContent);
      
      // Validate the response format
      if (!parsedQuestion.question || 
          !Array.isArray(parsedQuestion.options) || 
          parsedQuestion.options.length !== 4 ||
          !parsedQuestion.correctAnswer ||
          !parsedQuestion.explanation ||
          !parsedQuestion.options.every(opt => /^[A-D]\)/.test(opt))) {
        console.error('Invalid question format:', JSON.stringify(parsedQuestion, null, 2));
        throw new Error('Response format is invalid');
      }
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      console.error('Raw response content:', data.choices[0].message.content);
      throw new Error('Failed to generate a properly formatted question');
    }

    return new Response(JSON.stringify(parsedQuestion), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-question function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate question' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
