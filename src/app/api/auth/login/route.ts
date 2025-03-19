import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { BaseUrlTypes, endpoints, getBaseUrl } from 'src/utils/axios';

export async function POST(req: NextRequest) {
  try {
    const dataAll = await req.json();
    const response = await axios.post(
      getBaseUrl(BaseUrlTypes.ENUM_HOST_BASE_URI) + endpoints.auth.login,
      dataAll
    );

    return NextResponse.json(response.data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response?.data || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
