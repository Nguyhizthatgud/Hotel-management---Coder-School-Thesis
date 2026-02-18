"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Star, Zap, Crown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const faqs = [
    {
      question: t("pricing_faq_question1"),
      answer: t("pricing_faq_answer1")
    },
    {
      question: t("pricing_faq_question2"),
      answer: t("pricing_faq_answer2")
    },
    {
      question: t("pricing_faq_question3"),
      answer: t("pricing_faq_answer3")
    },
    {
      question: t("pricing_faq_question4"),
      answer: t("pricing_faq_answer4")
    },
    {
      question: t("pricing_faq_question5"),
      answer: t("pricing_faq_answer5")
    },
    {
      question: t("pricing_faq_question6"),
      answer: t("pricing_faq_answer6")
    }
  ];
  const pricingPlans = [
    {
      name: t("pricing_plan1_title"),
      icon: Star,
      description: t("pricing_plan1_desc"),
      monthlyPrice: 0,
      annualPrice: 470,
      features: [
        { text: t("pricing_plan1_feature1"), included: true },
        { text: t("pricing_plan1_feature2"), included: true },
        { text: t("pricing_plan1_feature3"), included: true },
        { text: t("pricing_plan1_feature4"), included: true },
        { text: t("pricing_plan1_feature5"), included: true },
        { text: t("pricing_plan1_feature6"), included: false },
        { text: t("pricing_plan1_feature7"), included: false },
        { text: t("pricing_plan1_feature8"), included: false },
        { text: t("pricing_plan1_feature9"), included: false }
      ],
      popular: false,
      color: "slate"
    },
    {
      name: t("pricing_plan2_title"),
      icon: Zap,
      description: t("pricing_plan2_desc"),
      monthlyPrice: 129000,
      annualPrice: 1240,
      features: [
        { text: t("pricing_plan2_feature1"), included: true },
        { text: t("pricing_plan2_feature2"), included: true },
        { text: t("pricing_plan2_feature3"), included: true },
        { text: t("pricing_plan2_feature4"), included: true },
        { text: t("pricing_plan2_feature5"), included: true },
        { text: t("pricing_plan2_feature6"), included: true },
        { text: t("pricing_plan2_feature7"), included: true },
        { text: t("pricing_plan2_feature8"), included: true },
        { text: t("pricing_plan2_feature9"), included: true },
        { text: t("pricing_plan2_feature10"), included: false }
      ],
      popular: true,
      color: "amber"
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: t("pricing_plan3_desc"),
      monthlyPrice: 299000,
      annualPrice: 2870000,
      features: [
        { text: t("pricing_plan3_feature1"), included: true },
        { text: t("pricing_plan3_feature2"), included: true },
        { text: t("pricing_plan3_feature3"), included: true },
        { text: t("pricing_plan3_feature4"), included: true },
        { text: t("pricing_plan3_feature5"), included: true },
        { text: t("pricing_plan3_feature6"), included: true },
        { text: t("pricing_plan3_feature7"), included: true },
        { text: t("pricing_plan3_feature8"), included: true },
        { text: t("pricing_plan3_feature9"), included: true },
        { text: t("pricing_plan3_feature10"), included: true },
        { text: t("pricing_plan3_feature11"), included: true }
      ],
      popular: false,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="py-16 md:py-30 bg-stone-80 bg-linear-to-b from-stone-200 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 max-w-4xl mx-auto leading-tight font-price ">
            {t("pricing_heading")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-price">{t("pricing_subheading")}</p>
        </div>
      </section>
      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const monthlyEquivalent = isAnnual ? (plan.annualPrice / 12).toFixed(0) : price;

              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                    plan.popular
                      ? "border-2 border-amber-400 shadow-xl scale-105 md:scale-110"
                      : "border-slate-200 hover:scale-105"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-linear-to-r from-amber-500 to-orange-500 text-white px-4 py-1 text-xs tracking-wide">
                      MOST POPULAR
                    </div>
                  )}

                  <CardContent className="p-8">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <div
                        className={`w-12 h-12 rounded-lg ${
                          plan.color === "amber"
                            ? "bg-linear-to-br from-amber-400 to-orange-400"
                            : plan.color === "orange"
                              ? "bg-linear-to-br from-orange-500 to-red-500"
                              : "bg-slate-100"
                        } flex items-center justify-center mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${plan.color === "slate" ? "text-slate-600" : "text-white"}`} />
                      </div>
                      <h3 className="text-2xl text-slate-800 mb-2">{plan.name}</h3>
                      <p className="text-slate-600 text-sm">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl text-slate-800">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          }).format(Number(monthlyEquivalent))}
                        </span>
                        <span className="text-slate-600">/month</span>
                      </div>
                      {isAnnual && <p className="text-sm text-slate-500">Billed annually (${price}/year)</p>}
                      {!isAnnual && price !== 0 ? (
                        <p className="text-sm text-slate-500">{t("pricing_month_price")}</p>
                      ) : (
                        <p className="text-sm text-slate-500">{t("pricing_plan1_price")}</p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full h-12 mb-6 ${
                        plan.popular
                          ? "bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
                          : "bg-slate-800 hover:bg-slate-700 text-white"
                      }`}
                    >
                      {t("pricing_select_plan_button")}
                    </Button>

                    {/* Features List */}
                    <div className="space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                          ) : (
                            <div className="shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                              <X className="h-3 w-3 text-slate-400" />
                            </div>
                          )}
                          <span className={`text-sm ${feature.included ? "text-slate-700" : "text-slate-400"}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Custom Enterprise CTA */}
          <div className="mt-12 text-center">
            <p className=" mb-4 text-muted-foreground">{t("pricing_custom_solution")}</p>
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              {t("pricing_contact_sales_button")}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-linear-to-br from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-slate-800 mb-4">{t("pricing_faq_heading")}</h2>
            <p className="text-lg text-slate-600">{t("pricing_faq_subheading")}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-800 pr-8">{faq.question}</span>
                  <span className="text-slate-400 shrink-0">{openFaqIndex === index ? "−" : "+"}</span>
                </button>
                {openFaqIndex === index && <div className="px-6 pb-4 text-slate-600">{faq.answer}</div>}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">{t("pricing_contact_support")}:</p>
            <Button className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
              {t("pricing_contact_support_button")}
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">{t("pricing_final_cta_heading")}</h2>
          <p className="text-lg text-slate-300 mb-8">{t("pricing_final_cta_subheading")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 px-8">
              {t("pricing_final_cta_start_trial")}
            </Button>
            <Button variant="outline" className="border-white text-black hover:bg-white hover:text-slate-800 h-12 px-8">
              {t("pricing_final_cta_contact_sales")}
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default PricingPage;
