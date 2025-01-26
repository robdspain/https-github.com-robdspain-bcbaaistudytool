import React from 'react';
    import { Card } from "@/components/ui/card";
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts';

    const barData = [
      { name: 'Behaviorism and Philosophical Foundations', accuracy: 80 },
      { name: 'Concepts and Principles', accuracy: 90 },
      { name: 'Measurement, Data Display, and Interpretation', accuracy: 75 },
      { name: 'Experimental Design', accuracy: 95 },
      { name: 'Ethical and Professional Issues', accuracy: 85 },
    ];

    const lineData = [
      { month: 'Jan', accuracy: 10 },
      { month: 'Feb', accuracy: 30 },
      { month: 'Mar', accuracy: 50 },
      { month: 'Apr', accuracy: 70 },
      { month: 'May', accuracy: 90 },
      { month: 'Jun', accuracy: 100 },
    ];

    export const ExampleGraphs = () => {
      return (
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-quiz-primary mb-4 text-center">Main Domains</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#1B584E" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-quiz-primary mb-4 text-center">Mastery over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData} margin={{ top: 10, right: 30, left: 30, bottom: 20 }}>
                <XAxis dataKey="month" label={{ value: 'Month', position: 'bottom', offset: 0 }} stroke="#000" />
                <YAxis label={{ value: 'Correct Answers (%)', angle: -90, position: 'left', offset: 10 }} stroke="#000" domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#000" strokeWidth={2} />
                <ReferenceLine y={90} strokeDasharray="3 3" stroke="#000" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      );
    };
