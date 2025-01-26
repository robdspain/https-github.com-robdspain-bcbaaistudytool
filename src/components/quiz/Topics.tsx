import { useState } from "react";
    import { Button } from "@/components/ui/button";
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";
    import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
    import { cn } from "@/lib/utils";

    type Topic = {
      main: string;
      subtopics: string[];
    };

    // BCBA Task List Topics (6th Edition)
    const topics: Topic[] = [
      {
        main: "Behaviorism and Philosophical Foundations",
        subtopics: [
          "Goals of behavior analysis",
          "Philosophical assumptions",
          "Radical behaviorism perspective",
          "Distinctions in behavior analysis",
          "Dimensions of applied behavior analysis",
        ],
      },
      {
        main: "Concepts and Principles",
        subtopics: [
          "Behavior, response, and response class",
          "Stimulus and stimulus class",
          "Respondent and operant conditioning",
          "Positive and negative reinforcement",
          "Positive and negative punishment",
          "Automatic and socially mediated contingencies",
          "Unconditioned, conditioned, and generalized reinforcers",
          "Unconditioned, conditioned, and generalized punishers",
          "Simple schedules of reinforcement",
          "Complex schedules of reinforcement",
          "Operant and respondent extinction",
          "Stimulus control",
          "Stimulus discrimination",
          "Stimulus and response generalization",
          "Response maintenance",
          "Motivating operations",
          "Motivating operations vs stimulus control",
          "Rule-governed vs contingency-shaped behavior",
          "Verbal operants",
          "Multiple control in verbal behavior",
          "Emergent relations and generative performance",
          "Behavioral momentum",
          "Matching law",
          "Imitation and observational learning",
        ],
      },
      {
        main: "Measurement, Data Display, and Interpretation",
        subtopics: [
          "Operational definitions",
          "Direct, indirect, and product measures",
          "Measuring occurrence",
          "Temporal dimensions of behavior",
          "Continuous vs discontinuous measurement",
          "Discontinuous measurement procedures",
          "Measuring efficiency",
          "Validity and reliability",
          "Selecting measurement procedures",
          "Graphing data",
          "Interpreting graphed data",
          "Procedural integrity measurement",
        ],
      },
      {
        main: "Experimental Design",
        subtopics: [
          "Dependent and independent variables",
          "Internal and external validity",
          "Threats to internal validity",
          "Single-case experimental designs",
          "Single-case vs group designs",
          "Interpreting single-case designs",
          "Types of single-case designs",
          "Comparative, component, and parametric analyses",
          "Applying single-case designs",
        ],
      },
      {
        main: "Ethical and Professional Issues",
        subtopics: [
          "Core ethical principles",
          "Risks of unethical behavior",
          "Professional development",
          "Confidentiality requirements",
          "Public statements requirements",
          "Service discontinuation",
          "Multiple relationships",
          "Professional relationships",
          "Cultural humility",
          "Culturally responsive service",
          "Personal biases",
          "Legal and regulatory requirements",
        ],
      },
      {
        main: "Behavior Assessment",
        subtopics: [
          "Record review",
          "Cultural variables in assessment",
          "Skill assessment",
          "Preference assessment",
          "Descriptive assessment",
          "Functional analysis",
          "Service needs assessment",
          "Goal prioritization",
        ],
      },
      {
        main: "Behavior-Change Procedures",
        subtopics: [
          "Reinforcement procedures",
          "Differential reinforcement",
          "Time-based reinforcement",
          "Conditioned reinforcers",
          "Motivating operations and discriminative stimuli",
          "Discrimination procedures",
          "Prompting procedures",
          "Prompt fading",
          "Modeling procedures",
          "Instructions and rules",
          "Shaping",
          "Chaining procedures",
          "Trial-based and free-operant procedures",
          "Group contingencies",
          "Generalization procedures",
          "Maintenance procedures",
          "Punishment procedures",
          "Emotional effects of procedures",
          "Emergent relations procedures",
        ],
      },
      {
        main: "Selecting and Implementing Interventions",
        subtopics: [
          "Intervention goals",
          "Intervention selection",
          "Alternative behaviors",
          "Unwanted effects mitigation",
          "Relapse prevention",
          "Procedural integrity decisions",
          "Intervention effectiveness decisions",
          "Collaboration",
        ],
      },
      {
        main: "Personnel Supervision and Management",
        subtopics: [
          "Benefits of supervision",
          "Supervisory relationships",
          "Equity in supervision",
          "Supervision goals",
          "Performance management",
          "Function-based supervision",
          "Supervisory decisions",
        ],
      },
    ];

    interface TopicsProps {
      onSelect: (main: string, sub: string) => void;
      showTopicSelection: boolean;
      onHideTopicSelection: () => void;
    }

    export const Topics = ({ onSelect, showTopicSelection, onHideTopicSelection }: TopicsProps) => {
      const [selectedMain, setSelectedMain] = useState<string>("");
      const [selectedSub, setSelectedSub] = useState<string>("");

      const handleMainTopicSelect = (value: string) => {
        setSelectedMain(value);
        setSelectedSub(""); // Reset subtopic when main topic changes
      };

      const handleSubtopicSelect = (value: string) => {
        setSelectedSub(value);
      };

      const handleGenerateQuestion = () => {
        if (selectedMain && selectedSub) {
          onSelect(selectedMain, selectedSub);
          onHideTopicSelection();
        }
      };

      // Get subtopics for selected main topic
      const currentSubtopics = topics.find(
        (topic) => topic.main === selectedMain
      )?.subtopics || [];

      if (!showTopicSelection) {
        return null;
      }

      return (
        <div className="space-y-4 w-full max-w-2xl mx-auto border border-quiz-primary rounded-lg p-4">
          <div className="space-y-4">
            {/* Main Domain Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Main Domain
              </label>
              <Select value={selectedMain} onValueChange={handleMainTopicSelect} >
                <SelectTrigger className="w-full border border-gray-300">
                  <SelectValue placeholder="Choose a main domain" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.main} value={topic.main}>
                      {topic.main}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subdomain Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subdomain
              </label>
              <Select
                value={selectedSub}
                onValueChange={handleSubtopicSelect}
                disabled={!selectedMain}
              >
                <SelectTrigger className="w-full border border-gray-300">
                  <SelectValue placeholder={selectedMain ? "Choose a subdomain" : "Select a main domain first"} />
                </SelectTrigger>
                <SelectContent>
                  {currentSubtopics.map((subtopic) => (
                    <SelectItem key={subtopic} value={subtopic}>
                      {subtopic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Question Button */}
            <Button
              className="w-full mt-4 bg-quiz-primary hover:bg-quiz-primary/90 text-white shadow-md transition-transform transform-gpu hover:scale-105"
              onClick={handleGenerateQuestion}
              disabled={!selectedMain || !selectedSub}
            >
              <PlayCircle className="mr-3 h-5 w-5" />
              Generate Question
            </Button>
          </div>
        </div>
      );
    };
