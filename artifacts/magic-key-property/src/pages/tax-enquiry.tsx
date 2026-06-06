import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSubmitTaxEnquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  alreadyInvestingInProperty: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  alreadyHasLimitedCompany: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  serviceRequired: z.enum([
    "limited_company_setup", "bookkeeping", "annual_accounts", 
    "corporation_tax", "self_assessment", "vat", "payroll", 
    "spv_setup", "property_tax_planning", "other"
  ], {
    required_error: "Please select a service",
  }),
  numberOfPropertiesOwned: z.string().optional(),
  estimatedAnnualRentalIncome: z.string().optional(),
  propertiesOwnedPersonallyOrCompany: z.string().optional(),
  needCompaniesHouseHelp: z.enum(["yes", "no"]).nullable().optional(),
  needBusinessBankAccountHelp: z.enum(["yes", "no"]).nullable().optional(),
  needTaxAdviceBeforePurchase: z.enum(["yes", "no"]).nullable().optional(),
  preferredContactMethod: z.string().optional(),
  messageOrEnquiry: z.string().optional(),
  consentToContact: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" })
  }),
  privacyAcknowledged: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge the privacy notice" })
  })
});

export default function TaxEnquiryPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitTaxEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      numberOfPropertiesOwned: "",
      estimatedAnnualRentalIncome: "",
      propertiesOwnedPersonallyOrCompany: "",
      preferredContactMethod: "",
      messageOrEnquiry: "",
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

      {/* ── Form hero banner ─────────────────────────────────────────────────── */}
      <section className="form-hero w-full">
        <div className="orb orb-1" style={{ opacity: 0.5 }} />
        <div className="orb orb-2" style={{ opacity: 0.3 }} />
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl relative z-10 flex flex-col items-start gap-4">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="badge-pill">Tax &amp; Accounting</div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            Tax &amp; Accounting Enquiry
          </h1>
          <p className="text-gray-400">Complete the form below to receive professional tax and accounting advice.</p>
        </div>
      </section>

      {/* ── Form section ─────────────────────────────────────────────────────── */}
      <section className="form-body w-full">
        <div className="container mx-auto px-4 py-10 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">

        {submitted ? (
          <div className="form-success-card">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(201,152,31,0.15)" }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: "#C9981F" }} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Enquiry Submitted</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Thank you for your Tax &amp; Accounting enquiry. Our specialists will review your details and be in touch shortly.
            </p>
            <Link href="/">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="disclaimer-bar mb-8">
              <p className="text-xs text-gray-500">
                <strong className="text-gray-700">Disclaimer:</strong> This portal collects enquiries only. No regulated mortgage, investment, tax or legal advice is given here. All recommendations are provided only after a full review by a qualified professional.
              </p>
            </div>

            <div className="form-card">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <div className="space-y-6">
                      <h3 className="form-section-heading">Personal Details</h3>
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
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <h3 className="form-section-heading">Business Profile</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="alreadyInvestingInProperty"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Already investing in property? *</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="yes" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="no" />
                                    </FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="alreadyHasLimitedCompany"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Already have a limited company? *</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="yes" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Yes</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="no" />
                                    </FormControl>
                                    <FormLabel className="font-normal">No</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="serviceRequired"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>Service Required *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="limited_company_setup">Limited Company Setup</SelectItem>
                                  <SelectItem value="spv_setup">SPV Setup</SelectItem>
                                  <SelectItem value="property_tax_planning">Property Tax Planning</SelectItem>
                                  <SelectItem value="annual_accounts">Annual Accounts</SelectItem>
                                  <SelectItem value="corporation_tax">Corporation Tax</SelectItem>
                                  <SelectItem value="self_assessment">Self Assessment</SelectItem>
                                  <SelectItem value="bookkeeping">Bookkeeping</SelectItem>
                                  <SelectItem value="vat">VAT</SelectItem>
                                  <SelectItem value="payroll">Payroll</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="numberOfPropertiesOwned"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of properties owned</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 3" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="estimatedAnnualRentalIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated annual rental income</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. £24,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="propertiesOwnedPersonallyOrCompany"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>Are properties owned personally or through a company?</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Personally" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="needCompaniesHouseHelp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need help with Companies House?</FormLabel>
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
                          name="needBusinessBankAccountHelp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need help with business bank account?</FormLabel>
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
                          name="needTaxAdviceBeforePurchase"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Need tax advice before purchasing?</FormLabel>
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
                                <Input placeholder="e.g. Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="messageOrEnquiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message / Enquiry Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide any additional details..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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

                    <Button type="submit" className="w-full rounded-full font-semibold py-4 text-base" style={{ backgroundColor: "#C9981F" }} disabled={mutation.isPending}>
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
            </div>
          </>
        )}
        </div>
      </section>
    </Layout>
  );
}
