import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        // 2. Send Email
        const { data, error } = await resend.emails.send({
            from: 'Keren Boshi <keren@boshik.com>',
            to: ['kerenboshi@gmail.com'],
            subject: `[Contact Form] ${subject}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error('Resend Error:', error);
            if ((error as any).name === 'quota_exceeded') {
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
