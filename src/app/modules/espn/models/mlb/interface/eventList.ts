interface EventList {
    events: EspnEvent[];
}

interface EspnEvent {
    id: string;
    date: string;
    summary: string;
    competitors: Competitor[];
}

interface Competitor {
    id: string;
    homeAway: string | 'home' | 'away';
    score: number;
    record: string;
    abbreviation: string;
}

export { EventList, EspnEvent, Competitor };
