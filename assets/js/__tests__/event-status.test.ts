import { describe, it, expect } from 'vitest';
import { parseTime, buildDate, computeStatus, type EventData } from '../event-status.logic';

// ─── parseTime ──────────────────────────────────────────────

describe('parseTime', () => {
  it('parses standard PM time', () => {
    expect(parseTime('7:00 PM')).toEqual({ hours: 19, minutes: 0 });
  });

  it('parses PM time with minutes', () => {
    expect(parseTime('2:30 PM')).toEqual({ hours: 14, minutes: 30 });
  });

  it('parses standard AM time', () => {
    expect(parseTime('11:30 AM')).toEqual({ hours: 11, minutes: 30 });
  });

  it('handles 12:00 AM (midnight)', () => {
    expect(parseTime('12:00 AM')).toEqual({ hours: 0, minutes: 0 });
  });

  it('handles 12:00 PM (noon)', () => {
    expect(parseTime('12:00 PM')).toEqual({ hours: 12, minutes: 0 });
  });

  it('handles 12:30 PM', () => {
    expect(parseTime('12:30 PM')).toEqual({ hours: 12, minutes: 30 });
  });

  it('handles 12:30 AM', () => {
    expect(parseTime('12:30 AM')).toEqual({ hours: 0, minutes: 30 });
  });

  it('is case-insensitive', () => {
    expect(parseTime('3:00 pm')).toEqual({ hours: 15, minutes: 0 });
    expect(parseTime('9:00 am')).toEqual({ hours: 9, minutes: 0 });
  });

  it('returns null for invalid input', () => {
    expect(parseTime('')).toBeNull();
    expect(parseTime('not a time')).toBeNull();
    expect(parseTime('14:00')).toBeNull(); // no AM/PM
  });
});

// ─── buildDate ──────────────────────────────────────────────

describe('buildDate', () => {
  it('builds date with time string', () => {
    const d = buildDate('2026-03-15', '7:00 PM', false);
    expect(d).toEqual(new Date('2026-03-15T19:00:00'));
  });

  it('builds date with AM time', () => {
    const d = buildDate('2026-03-15', '9:30 AM', false);
    expect(d).toEqual(new Date('2026-03-15T09:30:00'));
  });

  it('falls back to start of day when no time and fallbackEndOfDay is false', () => {
    const d = buildDate('2026-03-15', '', false);
    expect(d).toEqual(new Date('2026-03-15T00:00:00'));
  });

  it('falls back to end of day when no time and fallbackEndOfDay is true', () => {
    const d = buildDate('2026-03-15', '', true);
    expect(d).toEqual(new Date('2026-03-15T23:59:59'));
  });

  it('returns null for empty date string', () => {
    expect(buildDate('', '7:00 PM', false)).toBeNull();
  });

  it('ignores invalid time and falls back', () => {
    const d = buildDate('2026-03-15', 'garbage', true);
    expect(d).toEqual(new Date('2026-03-15T23:59:59'));
  });
});

// ─── computeStatus ──────────────────────────────────────────

describe('computeStatus', () => {
  const base: EventData = {
    current: 'up-next',
    startDate: '2026-03-15',
    endDate: '2026-03-15',
    startTime: '7:00 PM',
    endTime: '9:00 PM',
    allDay: false,
  };

  it('returns "ongoing" when now is during the event', () => {
    const now = new Date('2026-03-15T20:00:00');
    expect(computeStatus(base, now)).toBe('ongoing');
  });

  it('returns "ongoing" at exact start time', () => {
    const now = new Date('2026-03-15T19:00:00');
    expect(computeStatus(base, now)).toBe('ongoing');
  });

  it('returns "ongoing" at exact end time', () => {
    const now = new Date('2026-03-15T21:00:00');
    expect(computeStatus(base, now)).toBe('ongoing');
  });

  it('returns "done" after the event ends', () => {
    const now = new Date('2026-03-15T21:01:00');
    expect(computeStatus(base, now)).toBe('done');
  });

  it('returns null when event has not started yet', () => {
    const now = new Date('2026-03-15T18:00:00');
    expect(computeStatus(base, now)).toBeNull();
  });

  it('skips events with "planning" status', () => {
    const now = new Date('2026-03-15T20:00:00');
    expect(computeStatus({ ...base, current: 'planning' }, now)).toBeNull();
  });

  it('skips events with "done" status', () => {
    const now = new Date('2026-03-15T20:00:00');
    expect(computeStatus({ ...base, current: 'done' }, now)).toBeNull();
  });

  it('returns null when startDate is missing', () => {
    const now = new Date('2026-03-15T20:00:00');
    expect(computeStatus({ ...base, startDate: '' }, now)).toBeNull();
  });

  // All-day events
  it('returns "ongoing" for all-day event during the day', () => {
    const allDay: EventData = {
      current: 'up-next',
      startDate: '2026-03-15',
      endDate: '2026-03-15',
      startTime: '',
      endTime: '',
      allDay: true,
    };
    const now = new Date('2026-03-15T14:00:00');
    expect(computeStatus(allDay, now)).toBe('ongoing');
  });

  it('returns "done" for all-day event after midnight', () => {
    const allDay: EventData = {
      current: 'up-next',
      startDate: '2026-03-15',
      endDate: '2026-03-15',
      startTime: '',
      endTime: '',
      allDay: true,
    };
    const now = new Date('2026-03-16T00:00:00');
    expect(computeStatus(allDay, now)).toBe('done');
  });

  // Multi-day events
  it('returns "ongoing" for multi-day event on middle day', () => {
    const multiDay: EventData = {
      current: 'up-next',
      startDate: '2026-03-14',
      endDate: '2026-03-16',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      allDay: false,
    };
    const now = new Date('2026-03-15T12:00:00');
    expect(computeStatus(multiDay, now)).toBe('ongoing');
  });

  it('returns "done" for multi-day event after end', () => {
    const multiDay: EventData = {
      current: 'up-next',
      startDate: '2026-03-14',
      endDate: '2026-03-16',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      allDay: false,
    };
    const now = new Date('2026-03-16T17:01:00');
    expect(computeStatus(multiDay, now)).toBe('done');
  });

  // Uses startDate as endDate when endDate is empty
  it('uses startDate as fallback when endDate is empty', () => {
    const noEnd: EventData = {
      current: 'up-next',
      startDate: '2026-03-15',
      endDate: '',
      startTime: '7:00 PM',
      endTime: '9:00 PM',
      allDay: false,
    };
    const now = new Date('2026-03-15T20:00:00');
    expect(computeStatus(noEnd, now)).toBe('ongoing');
  });
});
