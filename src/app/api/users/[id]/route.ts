/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

interface UserDetail {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface ApiResponse {
    data: UserDetail;
}

interface Params {
    id: string;
}

export async function GET(
    request: Request,
    { params }: { params: Params }
) {
    try {
        const id = params.id;

        const response = await fetch(`https://reqres.in/api/users/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data: ApiResponse = await response.json();

        return NextResponse.json({
            id: data.data.id,
            email: data.data.email
        });

    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}