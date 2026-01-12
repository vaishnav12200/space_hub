import { NextRequest, NextResponse } from 'next/server';
import { fetchSpaceXLaunches, getFallbackMissionsData } from '../../../lib/spaceData';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const agency = searchParams.get('agency');
    const status = searchParams.get('status');

    // Start with fallback data (in production, you'd fetch from multiple APIs)
    let missions = getFallbackMissionsData();
    
    // Add SpaceX missions from their API
    try {
      const spaceXMissions = await fetchSpaceXLaunches();
      missions = [...missions, ...spaceXMissions];
    } catch (error) {
      console.warn('SpaceX API unavailable, using fallback data');
    }

    // Filter by agency if specified
    if (agency && agency !== 'all') {
      missions = missions.filter(mission => 
        mission.agency.toLowerCase().includes(agency.toLowerCase())
      );
    }

    // Filter by status if specified
    if (status && status !== 'all') {
      missions = missions.filter(mission => mission.status === status);
    }

    // Sort by launch date
    missions.sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime());

    return NextResponse.json({
      success: true,
      data: missions,
      total: missions.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch missions data',
      data: getFallbackMissionsData()
    }, { status: 500 });
  }
}