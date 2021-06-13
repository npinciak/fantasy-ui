interface EventList {
    events: Event[];
}

interface Event {
    id: string;
    summary: string;
    competitors: Competitor[];
}

interface Competitor {
    id: string;
    homeAway: 'home' | 'away';
    score: string;
    record: string;
    abbreviation: string;
}

export { EventList, Event, Competitor };
