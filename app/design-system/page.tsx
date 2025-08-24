"use client"

import React from "react"
import { 
  Button, 
  Input, 
  Label, 
  Textarea, 
  InputWithButton, 
  TextareaWithButton,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui"
import { Mail, Plus } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-inter">Design System</h1>
        <p className="text-lg text-slate-600 font-lexend">
          Beautifully designed components built with Radix UI and Tailwind CSS.
        </p>
      </div>

      {/* Buttons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-inter">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Default</h3>
            <Button>Continue</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Destructive</h3>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Outline</h3>
            <Button variant="outline">Cancel</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Subtle</h3>
            <Button variant="subtle">Subtle</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Ghost</h3>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Link</h3>
            <Button variant="link">Link</Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">With Icon</h3>
            <Button>
              <Mail className="w-4 h-4" />
              Login with Email
            </Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Just Icon</h3>
            <Button size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700 font-inter">Loading</h3>
            <Button loading>Loading</Button>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-inter">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email address" 
            />
            <p className="text-sm text-slate-500 font-lexend">
              Enter your email address
            </p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="email-filled">Email (Filled)</Label>
            <Input 
              id="email-filled" 
              type="email" 
              value="pietro.schirano@gmail.com"
              readOnly
            />
            <p className="text-sm text-slate-500 font-lexend">
              Enter your email address
            </p>
          </div>
        </div>
      </section>

      {/* Input with Button Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-inter">Input with Button</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithButton
            label="Email"
            placeholder="Email"
            buttonText="Subscribe"
            helperText="Enter your email address"
          />
          <InputWithButton
            label="Email"
            placeholder="Email"
            value="pietro.schirano@gmail.com"
            buttonText="Subscribe"
            helperText="Enter your email address"
          />
        </div>
      </section>

      {/* Textarea Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-inter">Textarea</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="message">Your message</Label>
            <Textarea 
              id="message" 
              placeholder="Type your message here" 
              rows={4}
            />
            <p className="text-sm text-slate-500 font-lexend">
              Your message will be copied to the support team.
            </p>
          </div>
          <TextareaWithButton
            label="Your message"
            placeholder="Type your message here"
            buttonText="Send message"
            rows={4}
          />
        </div>
      </section>

      {/* Accordion Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-inter">Accordion</h2>
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components' aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Color Palette Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6 font-inter">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-slate-50 rounded-md border"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-slate-900">Slate 50</p>
              <p className="text-xs text-slate-500">#FCFCFD</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-slate-100 rounded-md border"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-slate-900">Slate 100</p>
              <p className="text-xs text-slate-500">#F9F9FB</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-slate-300 rounded-md border"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-slate-900">Slate 300</p>
              <p className="text-xs text-slate-500">#CBD5E1</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-slate-500 rounded-md border"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-white">Slate 500</p>
              <p className="text-xs text-slate-300">#64748B</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-green-500 rounded-md border"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-white">Green 500</p>
              <p className="text-xs text-slate-500">#00D558</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-emerald-500 rounded-md border"></div>
            <div className="text-center">
              <p className="text-xs font-medium text-white">Emerald 500</p>
              <p className="text-xs text-slate-500">#10B981</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
