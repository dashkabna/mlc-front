import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;
  return token;
}

export async function POST(req: NextRequest) {
  try {
    const dataAll = await req.json();
    const url = dataAll.serviceUrl;
    const accessToken = await getToken();

    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    delete dataAll.serviceUrl;
    const response = await axios.post(url, dataAll, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const accessToken = await getToken();
    const url = decodeURIComponent(req.nextUrl.searchParams.toString().replace('url=', ''));
    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const accessToken = await getToken();
    const url = req.nextUrl.searchParams.get('url');
    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const accessToken = await getToken();
    const dataAll = await req.json();
    const url = dataAll.serviceUrl;

    if (!url) {
      throw new Error('URL is not defined in the request body');
    }
    delete dataAll.serviceUrl;
    // delete dataAll.headers;

    const response = await axios.put(url, dataAll, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
