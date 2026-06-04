import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSubmitMortgageEnquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  postcode: z.string().min(1, "Postcode is required"),
  mortgageType: z.enum(["residential", "buy_to_let", "remortgage", "product_transfer", "limited_company_btl", "bridging_development"], {
    required_error: "Please select a mortgage type",
  }),
  purchasePriceOrValue: z.string().optional(),
  mortgageAmountRequired: z.string().optional(),
  depositOrEquityAvailable: z.string().optional(),
  employmentStatus: z.string().min(1, "Employment status is required"),
  annualIncome: z.string().optional(),
  creditHistory: z.enum(["excellent", "good", "fair", "poor", "unsure"], {
    required_error: "Please select your credit history rating",
  }),
  propertyLocation: z.string().optional(),
  timescale: z.string().optional(),
  hasMortgageOffer: z.enum(["yes", "no"]).nullable().optional(),
  preferredContactMethod: z.string().optional(),
  consentToContact: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" })
  }),
  privacyAcknowledged: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge the privacy notice" })
  })
});

export default function MortgageEnquiryPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitMortgageEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      postcode: "",
      purchasePriceOrValue: "",
      mortgageAmountRequired: "",
      depositOrEquityAvailable: "",
      employmentStatus: "",
      annualIncome: "",
      propertyLocation: "",
      timescale: "",
      preferredContactMethod: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission failed",
            description: "There was a problem submitting your enquiry. Please try again.",
          });
        },
      }
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {submitted ? (
          <Card className="border-primary/20 shadow-md">
            <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl mb-2 font-serif">Enquiry Submitted</CardTitle>
              <CardDescription className="text-base max-w-md mx-auto mb-8">
                Thank you for your Mortgage enquiry. Our advisory team will review your details and be in touch shortly.
              </CardDescription>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Link>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-3">Mortgage Enquiry</h1>
              <p className="text-muted-foreground">Complete the form below to discover your mortgage options.</p>
            </div>

            <div className="mb-8 p-4 bg-muted/40 rounded-md border border-border/50">
              <p className="text-xs text-muted-foreground">
                <strong>Disclaimer:</strong> This portal collects enquiries only. No regulated mortgage, investment, tax or legal advice is given here. All recommendations are provided only after a full review by a qualified professional.
              </p>
            </div>

            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold border-b pb-2">Personal Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="jane@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mobileNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="07700 900000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Postcode *</FormLabel>
                              <FormControl>
                                <Input placeholder="SW1A 1AA" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Mortgage Requirements</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="mortgageType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mortgage Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="residential">Residential</SelectItem>
                                  <SelectItem value="buy_to_let">Buy-to-Let</SelectItem>
                                  <SelectItem value="remortgage">Remortgage</SelectItem>
                                  <SelectItem value="product_transfer">Product Transfer</SelectItem>
                                  <SelectItem value="limited_company_btl">Limited Company BTL</SelectItem>
                                  <SelectItem value="bridging_development">Bridging/Development Finance</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="employmentStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employment Status *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Employed, Self-employed" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="creditHistory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Credit History *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="excellent">Excellent</SelectItem>
                                  <SelectItem value="good">Good</SelectItem>
                                  <SelectItem value="fair">Fair</SelectItem>
                                  <SelectItem value="poor">Poor</SelectItem>
                                  <SelectItem value="unsure">Unsure</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="purchasePriceOrValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Purchase price / Property value</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. £250,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mortgageAmountRequired"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mortgage Amount Required</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. £200,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="depositOrEquityAvailable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deposit / Equity Available</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. £50,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="annualIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Income</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. £45,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="propertyLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Location</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. London" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timescale"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timescale</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. ASAP, within 3 months" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hasMortgageOffer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you already have a mortgage offer?</FormLabel>
                              <Select 
                                onValueChange={(v) => field.onChange(v === 'null' ? null : v)} 
                                defaultValue={field.value === null ? 'null' : field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="null">-- Select --</SelectItem>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredContactMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Contact Method</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Email, Phone morning" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                      <div className="p-4 bg-muted/30 rounded-md text-sm text-muted-foreground">
                        {/* PRIVACY: Change privacy wording here if needed */}
                        By submitting this form, you consent to being contacted about your enquiry. Your information will be handled in accordance with our Privacy Policy and used only for mortgage, property investment, tax, accounting or company formation-related services.
                      </div>

                      <FormField
                        control={form.control}
                        name="consentToContact"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="cursor-pointer">
                                I consent to be contacted regarding this enquiry. *
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="privacyAcknowledged"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="cursor-pointer">
                                I acknowledge the Privacy Notice. *
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full text-lg py-6" disabled={mutation.isPending}>
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
