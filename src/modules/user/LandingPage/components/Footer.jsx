import React from 'react'
import Logo from "../../../../assets/logo.jpg"
import { Link } from 'react-router-dom'
import { NewsletterForm } from './NewsLetterForm'

export const Footer = () => {
  return (
    <div>
         <footer className="bg-gray-100 border-t border-gray-200 pt-12 pb-6">
                  <div className="container mx-auto px-4 md:px-">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="col-span-1">
                        <Link to="/user/home" className="flex items-center mb-4">
                          <img src={Logo || "/placeholder.svg"} alt="KhanaBox Logo" width={40} height={40} className="mr-2" />
                          <span className="text-2xl font-bold text-green-600">KhanaBox</span>
                        </Link>
                        <p className="text-sm text-gray-600 mb-4">Company # 000000-445</p>
                        <p className="text-sm text-gray-600">Copyright 2023</p>
                        <div className="flex space-x-4 mt-4">{/* Social media icons would go here */}</div>
                      </div>
        
        
                      <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Legal Pages</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link to="#" className="text-gray-600 hover:text-green-600">
                              Terms and Conditions
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="text-gray-600 hover:text-green-600">
                              Privacy
                            </Link>
                          </li>
                        </ul>
                      </div>
        
                      <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Important Links</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link to="#" className="text-gray-600 hover:text-green-600">
                              FAQ
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="text-gray-600 hover:text-green-600">
                              Sign up to deliver
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="text-gray-600 hover:text-green-600">
                              Create a business account
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Get Exclusive Deals in your Inbox</h3>
                        <NewsletterForm/>
                      </div>
                    </div>
        
                    <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
                      <p>© Order Copyright 2023. All Rights Reserved.</p>
                      <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-green-600">
                          Privacy Policy
                        </Link>
                        <Link to="#" className="hover:text-green-600">
                          Terms
                        </Link>
                        <Link to="#" className="hover:text-green-600">
                          Pricing
                        </Link>
                        <span>Do not sell or share my personal information</span>
                      </div>
                    </div>
                  </div>
                </footer>
    </div>
  )
}

