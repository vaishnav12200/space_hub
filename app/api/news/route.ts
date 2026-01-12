import { NextRequest, NextResponse } from 'next/server';
import { fetchSpaceflightNews, getFallbackNewsData } from '../../../lib/spaceData';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const agency = searchParams.get('agency');

    // Fetch news from Spaceflight News API
    let articles = await fetchSpaceflightNews();
    
    // If no articles fetched, use fallback data
    if (!articles || articles.length === 0) {
      articles = getFallbackNewsData();
    }

    // Filter by agency if specified
    if (agency && agency !== 'all') {
      articles = articles.filter(article => 
        article.newsSite.toLowerCase().includes(agency.toLowerCase())
      );
    }

    // Limit results
    articles = articles.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: articles,
      total: articles.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch space news',
      data: getFallbackNewsData()
    }, { status: 500 });
  }
}