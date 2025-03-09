import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, SnailIcon as Snapchat } from "lucide-react"
import NewsletterForm from "@/components/newsletter-form"
import TestimonialSlider from "@/components/testimonial-slider"
import HeroSlider from "@/components/hero-slider"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSlider />

      {/* About Us Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-12">About Us</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Chef preparing organic food"
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 leading-relaxed">
                Fueled by growing consumer demand for new tastes, cleaner ingredients, health benefits, and more
                convenient ways to shop and eat, the business of specialty food is taking off at full speed. This
                step-by-step guide arms entrepreneurial foodies like yourself with an industry overview of market
                trends, useful research for your marketing plan, and insight from practicing specialty food business
                owners.
              </p>
              <div className="mt-6">
                <Link
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <Link href="/" className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="KhanaBox Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-2xl font-bold text-green-600">KhanaBox</span>
              </Link>
              <p className="text-sm text-gray-600 mb-4">Company # 000000-445</p>
              <p className="text-sm text-gray-600">Copyright 2023</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                <Link href="#" aria-label="Snapchat">
                  <Snapchat className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Get Exclusive Deals in your Inbox</h3>
              <NewsletterForm />
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Legal Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Important Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    Sign up to deliver
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-green-600">
                    Create a business account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
            <p>© Order Copyright 2023. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-green-600">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-green-600">
                Terms
              </Link>
              <Link href="#" className="hover:text-green-600">
                Pricing
              </Link>
              <span>Do not sell or share my personal information</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

