import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import ProfileForm from "@/components/profile/ProfileForm";

const Profile = () => {
  const { user } = useAuth();

  console.log("Rendering Profile page for user:", user?.id);

  const { data: profile, isLoading, refetch } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      console.log("Fetching profile for user:", user?.id);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Fetched profile:", data);
      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-quiz-primary"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="p-6 bg-quiz-accent shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-quiz-primary">Profile Settings</h1>
        <ProfileForm initialData={profile} onSubmitSuccess={refetch} />
      </Card>
    </div>
  );
};

export default Profile;
