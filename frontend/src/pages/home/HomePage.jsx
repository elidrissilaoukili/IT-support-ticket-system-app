import React from 'react'
import GuestLayout from '../../Layouts/GuestLayout'

const HomePage = () => {
    return (
        <GuestLayout>
            <section>
                <div class="max-w-4xl mx-auto bg-white rounded-lg p-6">
                    <h1 class=" font-semibold text-3xl text-center text-gray-800 mb-4">IT Support Ticket System</h1>
                    <p class="text-gray-600 mb-6">Develop a simple ticket management application that allows employees to report and track IT issues.</p>

                    <h2 class="text-xl font-semibold text-gray-700 mb-2">Requirements</h2>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">1. Ticket Creation:</h3>
                            <ul class="list-disc list-inside text-gray-600">
                                <li>Employees can create tickets with the following details:</li>
                                <ul class="ml-4 list-disc">
                                    <li>Title</li>
                                    <li>Description</li>
                                    <li>Priority (Low, Medium, High)</li>
                                    <li>Category (Network, Hardware, Software, Other)</li>
                                    <li>Creation Date (set automatically)</li>
                                </ul>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">2. Status Tracking:</h3>
                            <ul class="list-disc list-inside text-gray-600">
                                <li>Tickets have the following statuses:</li>
                                <ul class="ml-4 list-disc">
                                    <li>New (default when created)</li>
                                    <li>In Progress (changed by IT support)</li>
                                    <li>Resolved (changed by IT support)</li>
                                </ul>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">3. User Roles:</h3>
                            <ul class="list-disc list-inside text-gray-600">
                                <li><span class="font-semibold">Employees:</span> Can create and view their own tickets.</li>
                                <li><span class="font-semibold">IT Support:</span> Can view all tickets, change statuses, and add comments.</li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">4. Audit Log:</h3>
                            <p class="text-gray-600">Track changes to ticket status and added comments.</p>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">5. Search & Filter:</h3>
                            <p class="text-gray-600">Search by ticket ID and status.</p>
                        </div>
                    </div>

                    <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-2">Technology Stack & Guidelines</h2>
                    <div class="space-y-4">
                        <ul class="list-disc list-inside text-gray-600">
                            <li><span class="font-semibold">Backend:</span> Java 17, Spring Boot, RESTful API with Swagger/OpenAPI</li>
                            <li><span class="font-semibold">Database:</span> Oracle SQL (provide schema as an SQL script)</li>
                            <li><span class="font-semibold">UI:</span> Java Swing (use MigLayout or GridBagLayout)</li>
                            <li><span class="font-semibold">Testing:</span> JUnit, Mockito</li>
                        </ul>
                    </div>

                    <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-2">Documentation</h2>
                    <ul class="list-disc list-inside text-gray-600">
                        <li><span class="font-semibold">README:</span> Setup instructions</li>
                        <li><span class="font-semibold">Markdown file:</span> API documentation</li>
                    </ul>

                    <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-2">Deployment</h2>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>Docker container for backend and Oracle DB</li>
                        <li>Swing client as an executable JAR file</li>
                    </ul>

                    <h2 class="text-xl font-semibold text-gray-700 mt-6 mb-2">Submission</h2>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>GitHub repository with code and README</li>
                        <li>Docker setup for easy local execution</li>
                    </ul>
                </div>
            </section>
        </GuestLayout>
    )
}

export default HomePage