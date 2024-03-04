'use client'

import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { useSearchParams } from "next/navigation";
import { sendFormData, getSessionToken as getSessionTokenFromServer, randomServerAction } from "./actions";
import { getSessionToken as getSessionTokenFromClient } from "./functions";

import "./styles.css";

const enablDiagnostics = false;

interface ContactProps {
    subject?: string;
    rows?: number;
}

export function Contact() {
    const [confirmation, setConfirmation] = useState<string | undefined>(undefined);
    const rows = 10;
    const searchParams = useSearchParams();
    let from = searchParams?.get('from');
    let formSubject = "enquiry topic: general enquiry";
    if (from) {
        formSubject = `enquiry topic: ${from.slice(1)}`;
    }
    const { reset, register, handleSubmit, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (confirmation) {
            setTimeout(() => {
                setConfirmation("");
            }, 5000);
        }
    }, [confirmation])

    const onSubmit = async (data: any) => {
        console.log("form data", data, "errors", errors);
        setSubmitting(true);
        const reply = await sendFormData(data);
        reset();
        setSubmitting(false);
        if (reply.message) {
            setConfirmation(reply.message);
        } else {
            setConfirmation("Thank you. Your form has been submitted. For urgent enquiries please call 07512 738 100");
        }
    }

    return <>
        {enablDiagnostics && <>
            <button onClick={async () => console.log("getSessionTokenFromClient", await getSessionTokenFromClient())}>getSessionTokenFromClient</button>
            <button onClick={async () => console.log("getSessionTokenFromServer", await getSessionTokenFromServer())}>getSessionTokenFromServer</button>
            <button onClick={async () => console.log("randomServerAction", await randomServerAction())}>randomServerAction</button>
        </>}
        <div className="content" id="contact">
            {submitting && <h3>Submitting form...</h3>}
            {confirmation && <h3>{confirmation}</h3>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {errors.name?.type === 'required' && <p className="error">Name is required</p>}
                    <input id="name" type="text" placeholder="name" {...register("name", { required: true, maxLength: 80 })} />
                </div>
                <div>
                    {errors.email?.type === 'required' && errors.email.message && <p className="error">{errors.email.message as string}</p>}
                    {errors.email?.type === 'pattern' && errors.email.message && <p className="error">{errors.email.message as string}</p>}
                    <input
                        id="email"
                        type="text"
                        placeholder="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Entered value does not match email format"
                            }
                        })}
                    />
                </div>
                <div>
                    {errors.subject?.type === 'required' && <p className="error">Subject is required</p>}
                    <input type="text" value={formSubject} {...register("subject", { required: true, maxLength: 160 })} />
                </div>
                <div>
                    {errors.message?.type === 'required' && <p className="error">Message is required</p>}
                    <textarea rows={rows} placeholder="Please enter your message here" {...register("message", { required: true })} />
                </div>
                <input type="submit" />
            </form>
            <p><i>Developer note: This form uses react-hook-form for clientside validaton and server actions to
                provide robust client side validation with the security of csrf handling all on the server. This page
                has no interaction with the cms processing this form data it is all handled on the server. The server
                actions act as a secure proxy between the client and the CMS
            </i></p>
        </div>
    </>
}
