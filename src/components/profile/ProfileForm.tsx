import React from "react";
    import { useForm } from "react-hook-form";
    import { useToast } from "@/components/ui/use-toast";
    import { Button } from "@/components/ui/button";
    import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form";
    import { Input } from "@/components/ui/input";
    import { supabase } from "@/integrations/supabase/client";
    import { useAuth } from "@/providers/AuthProvider";
    import { motion } from "framer-motion";

    interface ProfileFormValues {
      first_name: string;
      last_name: string;
      phone_number: string;
      projected_exam_date: string;
      supervisor_name: string;
      supervisor_email: string;
    }

    interface ProfileFormProps {
      initialData: Partial<ProfileFormValues>;
      onSubmitSuccess: () => void;
    }

    const ProfileForm = ({ initialData, onSubmitSuccess }: ProfileFormProps) => {
      const { user } = useAuth();
      const { toast } = useToast();
      const form = useForm<ProfileFormValues>();
      const [isSubmitting, setIsSubmitting] = React.useState(false);

      React.useEffect(() => {
        if (initialData) {
          console.log("Setting form values with profile:", initialData);
          form.reset({
            first_name: initialData.first_name || "",
            last_name: initialData.last_name || "",
            phone_number: initialData.phone_number || "",
            projected_exam_date: initialData.projected_exam_date
              ? new Date(initialData.projected_exam_date).toISOString().split("T")[0]
              : "",
            supervisor_name: initialData.supervisor_name || "",
            supervisor_email: initialData.supervisor_email || "",
          });
        }
      }, [initialData, form]);

      const onSubmit = async (data: ProfileFormValues) => {
        setIsSubmitting(true);
        console.log("Submitting profile update:", data);
        try {
          const { error } = await supabase
            .from("profiles")
            .update({
              first_name: data.first_name,
              last_name: data.last_name,
              phone_number: data.phone_number,
              projected_exam_date: data.projected_exam_date,
              supervisor_name: data.supervisor_name,
              supervisor_email: data.supervisor_email,
            })
            .eq("id", user?.id);

          if (error) throw error;

          toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
          });
          onSubmitSuccess();
        } catch (error) {
          console.error("Error updating profile:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update profile. Please try again.",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-quiz-primary">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        {...field} 
                        className="bg-quiz-input border-quiz-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-quiz-primary">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        {...field} 
                        className="bg-quiz-input border-quiz-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-quiz-primary">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="(555) 555-5555" 
                      {...field} 
                      className="bg-quiz-input border-quiz-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projected_exam_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-quiz-primary">Expected Test Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      className="bg-quiz-input border-quiz-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supervisor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-quiz-primary">Supervisor Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Dr. Jane Smith" 
                      {...field} 
                      className="bg-quiz-input border-quiz-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supervisor_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-quiz-primary">Supervisor Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="supervisor@example.com"
                      {...field}
                      className="bg-quiz-input border-quiz-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-quiz-primary hover:bg-quiz-primary/90 relative"
              disabled={isSubmitting}
            >
              <span className="relative z-10">Save Changes</span>
              {isSubmitting && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 flex items-center justify-center text-sm text-white"
                >
                  Saving...
                </motion.span>
              )}
            </Button>
          </form>
        </Form>
      );
    };

    export default ProfileForm;
