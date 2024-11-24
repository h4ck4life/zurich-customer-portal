import { NextResponse } from 'next/server';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface ApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}

export async function GET(request: Request) {
    try {
        // Get page from URL params
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';

        // Fetch only the requested page
        const response = await fetch(`https://reqres.in/api/users?page=${page}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from external API');
        }

        const data: ApiResponse = await response.json();

        // Filter users with first name starting with 'G' or last name with 'W' (case insensitive)
        const filteredUsers = data.data.filter(user =>
            user.first_name.toLowerCase().startsWith('g') ||
            user.last_name.toLowerCase().startsWith('w')
        );

        // Mask emails in the filtered results
        const maskedUsers = filteredUsers.map(user => ({
            ...user,
            email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
        }));

        return NextResponse.json({
            page: parseInt(page),
            per_page: data.per_page,
            total: data.total,
            total_pages: data.total_pages,
            data: maskedUsers
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}