import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
     <section className="bg-white border-t border-gray-200 py-12 mt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center">
                                <Logo width="100px" />
                            </div>
                            <p className="text-gray-600 max-w-md">
                                Your go-to destination for insightful articles, stories, and updates. Join our community of readers and writers.
                            </p>
                            <div>
                                <p className="text-sm text-gray-500">
                                    &copy; Copyright 2025. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Affiliate Program
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    to="/"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer