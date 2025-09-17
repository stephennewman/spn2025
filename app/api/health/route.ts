import { NextResponse } from 'next/server';
import { getPlaza } from '@/lib/data';

export async function GET() {
  try {
    const plaza = await getPlaza();
    
    return NextResponse.json({
      ok: true,
      lastUpdated: plaza.lastUpdated,
      plazaName: plaza.plazaName,
      businessCount: plaza.businesses?.length || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      ok: false,
      error: 'Failed to load plaza data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
