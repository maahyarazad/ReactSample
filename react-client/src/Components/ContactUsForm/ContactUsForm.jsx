import React, { useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CustomInput from "../CustomInputs/CustomInput";
import CustomTextarea from "../CustomInputs/CustomTextArea";
import './ContactUsForm.css';
import { Paperclip } from 'lucide-react';
import { toast } from 'react-toastify';


const ContactForm = () => {
    const fileInputRef = useRef(null);

    const initialValues = {
        name: "",
        email: "",
        message: "",
        attachment: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        message: Yup.string().required("Message is required"),
        // attachment: Yup.mixed(), // add validation if needed
    });

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue("attachment", file);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const form = new FormData();
        form.append("name", values.name);
        form.append("email", values.email);
        form.append("message", values.message);
        if (values.attachment) {
            form.append("attachment", values.attachment);
        }

        try {
            const response = await axios.post(process.env.REACT_APP_SUBMIT_CONTACT_US_FORM, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            toast.success(response.data.message)
            resetForm();
        } catch (error) {
            toast.error(error)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="container py-5 request-form-section">

            <div class="row">
                <div class="col-12 col-md-6 p-4">

                    <h2 className="h3 fw-bold mb-2 lets-start">Let’s start</h2>
                    <p className="fw-semibold mb-3">What’s next</p>
                    <ul className="mb-4 ps-3 list-unstyled">
                        <li>1. Share your requirements</li>
                        <li>2. Analyze them with our experts</li>
                        <li>3. Get a detailed proposal</li>
                        <li>4. Kick off the project</li>
                    </ul>

                    <p className="mb-4">
                        If you have any questions, email us at
                        <a href="mailto:info@sumatosoft.com" className="ms-1 text-decoration-underline text-primary">
                            info@sumatosoft.com
                        </a>
                    </p>
                </div>
                <div class="col-12 col-md-6 p-4">

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, isSubmitting }) => (
                            <Form className="mb-5">
                                <CustomInput name="name" type="text" label="My Name*" placeholder="John Smith" />

                                <CustomInput name="email" type="email" label="Email Address*" placeholder="name@company.com" />

                                <CustomTextarea name="message" rows={5} label="Message*" placeholder="Describe your idea" />

                                <div className="d-flex justify-content-between mb-3">
                                    {/* <label htmlFor="attachment" className="form-label">Attach Files</label> */}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="attachment"
                                        name="attachment"
                                        className="d-none"
                                        accept=".doc, .pdf, .csv, .xlsx, .zip, .docx, .md"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />


                                    <div
                                        
                                        onClick={triggerFileInput}
                                        className="attachment-button">
                                            <Paperclip size={18} />
                                        Attach File
                                    </div>

                                    <ErrorMessage name="attachment" component="span" className="text-danger d-block mt-1" />

                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send"}
                                    </button>
                                </div>



                                <p className="form-text mt-3">
                                    By submitting, you agree to our{" "}
                                    <a
                                        href="https://google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-underline">
                                        Privacy Policy
                                    </a>.
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </section>
    );
};

export default ContactForm;
