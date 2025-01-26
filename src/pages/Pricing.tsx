import { useNavigate } from "react-router-dom";
    import { motion } from "framer-motion";
    import { Check, Star } from "lucide-react";
    import { useState, useRef } from "react";
    import confetti from "canvas-confetti";
    import NumberFlow from "@number-flow/react";
    import { Label } from "@/components/ui/label";
    import { Switch } from "@/components/ui/switch";
    import { useMediaQuery } from "@/hooks/use-media-query";
    import { cn } from "@/lib/utils";
    import { buttonVariants } from "@/components/ui/button";

    const plans = [
      {
        name: "Monthly",
        price: 29.99,
        yearlyPrice: 288,
        period: "month",
        features: [
          "Access to basic practice questions",
          "Limited question generation",
          "Basic progress tracking",
          "Community support"
        ],
        description: "Perfect for getting started",
        buttonText: "Get Started",
        href: "/auth",
        isPopular: false,
      },
      {
        name: "Three Month",
        price: 89.99,
        yearlyPrice: 288,
        period: "quarter",
        features: [
          "Unlimited AI-generated questions",
          "Advanced progress analytics",
          "Personalized study plans",
          "Priority support",
          "Performance insights"
        ],
        description: "Most popular for serious students",
        buttonText: "Get Started",
        href: "/auth",
        isPopular: true,
      },
      {
        name: "Yearly",
        price: 288,
        yearlyPrice: 288,
        period: "year",
        features: [
          "Everything in Three Month plan",
          "Custom question templates",
          "Team management",
          "Dedicated support",
          "API access"
        ],
        description: "For BCBA training programs",
        buttonText: "Get Started",
        href: "mailto:support@example.com",
        isPopular: false,
      },
    ];

    const Pricing = () => {
      const [isMonthly, setIsMonthly] = useState(true);
      const isDesktop = useMediaQuery("(min-width: 768px)");
      const switchRef = useRef<HTMLButtonElement>(null);
      const navigate = useNavigate();

      const handleToggle = (checked: boolean) => {
        setIsMonthly(!checked);
        if (checked && switchRef.current) {
          const rect = switchRef.current.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          confetti({
            particleCount: 50,
            spread: 60,
            origin: {
              x: x / window.innerWidth,
              y: y / window.innerHeight,
            },
            colors: [
              "#1B584E",
              "#E6B325",
              "#F8F9FA",
              "#8E9196",
            ],
            ticks: 200,
            gravity: 1.2,
            decay: 0.94,
            startVelocity: 30,
            shapes: ["circle"],
          });
        }
      };

      const renderPrice = (plan: any) => {
        const price = isMonthly
          ? plan.price
          : plan.period === 'year'
            ? plan.yearlyPrice
            : (plan.yearlyPrice / (plan.period === 'month' ? 12 : 4)).toFixed(2);
        return (
          <NumberFlow
            value={Number(price)}
            format={{
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }}
            transformTiming={{
              duration: 500,
              easing: "ease-out",
            }}
            willChange
            className="font-variant-numeric: tabular-nums"
          />
        );
      };

      const getButtonText = (plan: any) => {
        if (isMonthly) {
          return "Get Started";
        }
        if (plan.period === 'year') {
          return "Get Started";
        }
        return "Go with the yearly plan";
      };

      return (
        <div className="min-h-screen bg-quiz-background">
          <div className="container py-20">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-quiz-primary">
                Simple, Transparent Pricing
              </h2>
              <p className="text-quiz-text text-lg whitespace-pre-line">
                Choose the plan that best fits your BCBA exam preparation needs
              </p>
            </div>

            <div className="flex justify-center mb-10">
              <label className="relative inline-flex items-center cursor-pointer">
                <Label>
                  <Switch
                    ref={switchRef as any}
                    checked={!isMonthly}
                    onCheckedChange={handleToggle}
                    className="relative"
                  />
                </Label>
                <span className="ml-2 font-semibold text-quiz-text">
                  Annual billing <span className="text-quiz-primary font-bold">(Save 20%)</span>
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 1 }}
                  whileInView={
                    isDesktop
                      ? {
                          y: plan.isPopular ? -20 : 0,
                          opacity: 1,
                          x: index === 2 ? -30 : index === 0 ? 30 : 0,
                          scale: index === 0 || index === 2 ? 0.94 : 1.0,
                        }
                      : {}
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    delay: 0.4,
                    opacity: { duration: 0.5 },
                  }}
                  className={cn(
                    `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative shadow-lg`,
                    plan.isPopular ? "border-quiz-primary border-2" : "border-border",
                    "flex flex-col",
                    !plan.isPopular && "mt-5",
                    index === 0 || index === 2
                      ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                      : "z-10",
                    index === 0 && "origin-right",
                    index === 2 && "origin-left"
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-quiz-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                      <Star className="text-white h-4 w-4 fill-current" />
                      <span className="text-white ml-1 font-sans font-semibold">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    <p className="text-base font-semibold text-quiz-primary">
                      {plan.name}
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-quiz-primary">
                        {renderPrice(plan)}
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-quiz-text">
                        / {plan.period}
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-quiz-text">
                      {isMonthly ? "billed monthly" : "billed annually"}
                    </p>

                    <ul className="mt-5 gap-2 flex flex-col">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mr-2 text-quiz-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <hr className="w-full my-4" />

                    <button
                      onClick={() => {
                        if (plan.href.startsWith('mailto:')) {
                          window.location.href = plan.href;
                        } else {
                          navigate(plan.href);
                        }
                      }}
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                        }),
                        "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                        "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-quiz-primary hover:ring-offset-1 hover:bg-quiz-primary hover:text-white",
                        plan.isPopular
                          ? "bg-quiz-primary text-white"
                          : "bg-background text-quiz-primary"
                      )}
                    >
                      {getButtonText(plan)}
                    </button>
                    <p className="mt-6 text-xs leading-5 text-quiz-text">
                      {plan.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    export default Pricing;
