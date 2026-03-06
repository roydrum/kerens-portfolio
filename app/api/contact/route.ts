import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import * as CloudmersiveVirusApiClient from 'cloudmersive-virus-api-client';

const resend = new Resend(process.env.RESEND_API_KEY);

// Cloudmersive setup
const defaultClient = CloudmersiveVirusApiClient.ApiClient.instance;
const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.CLOUDMERSIVE_API_KEY;

const apiInstance = new CloudmersiveVirusApiClient.ScanApi();

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;
        const attachment = formData.get('attachment') as File | null;

        // 1. Virus Scan (if attachment exists)
        if (attachment) {
            const buffer = Buffer.from(await attachment.arrayBuffer());

            const scanResult = await new Promise((resolve, reject) => {
                apiInstance.scanFile(buffer, (error: any, data: any) => {
                    if (error) reject(error);
                    else resolve(data);
                });
            });

            // @ts-ignore
            if (!scanResult.CleanResult) {
                return NextResponse.json({ error: 'Virus detected in attachment' }, { status: 400 });
            }
        }

        // 2. Send Email
        const { data, error } = await resend.emails.send({
            from: 'Keren Boshi <keren@boshik.com>',
            to: ['kerenboshi@gmail.com'],
            subject: `[Contact Form] ${subject}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            attachments: attachment ? [
                {
                    filename: attachment.name,
                    content: Buffer.from(await attachment.arrayBuffer()),
                }
            ] : [],
        });

        if (error) {
            console.error('Resend Error:', error);
            if (error.name === 'quota_exceeded') {
                return NextResponse.json({ error: 'Monthly capacity reached. Please email directly.' }, { status: 429 });
            }
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error('API Error:', err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
