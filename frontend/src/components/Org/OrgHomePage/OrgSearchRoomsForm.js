import React, { useState } from 'react';

function OrgSearchRoomsForm() {
    const [dateRangeStart, setDateRangeStart] = useState('');
    const [dateRangeEnd, setDateRangeEnd] = useState('');
    const [timeRange, setTimeRange] = useState({ hours: 0, minutes: 30 });

    const handleDateRangeStartChange = (e) => {
        setDateRangeStart(e.target.value);
    };

    const handleDateRangeEndChange = (e) => {
        setDateRangeEnd(e.target.value);
    };

    const handleTimeRangeChange = (e) => {
        const minutes = parseInt(e.target.value, 10);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        setTimeRange({ hours, minutes: remainingMinutes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Date Range Start:", dateRangeStart);
        console.log("Date Range End:", dateRangeEnd);
        console.log("Time Range:", `${timeRange.hours} hours, ${timeRange.minutes} minutes`);

        // PERFORM API CALL HERE

        // Search form should redirect to search page
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="entry-form-container">
                <div className="entry-form-row">
                    <label htmlFor="dateRangeStart">Date Range:</label>
                    <div className="entry-form-input">
                        <input
                            type="date"
                            id="dateRangeStart"
                            name="dateRangeStart"
                            required
                            value={dateRangeStart}
                            onChange={handleDateRangeStartChange}
                        />
                        <label>to</label>
                        <input
                            type="date"
                            id="dateRangeEnd"
                            name="dateRangeEnd"
                            required
                            value={timeRange.hours * 60 + timeRange.minutes}
                            onChange={handleDateRangeEndChange}
                            className="smoother-scrollbar"
                        />
                    </div>
                </div>

                <div className="entry-form-row">
                    <div className="entry-form-input">
                        <label htmlFor="timeRange">Time Range:</label>
                        <input
                            type="range"
                            id="timeRange"
                            name="timeRange"
                            min="30"
                            max="1380"
                            step="30"
                            value={timeRange.hours * 60 + timeRange.minutes}
                            onChange={handleTimeRangeChange}
                        />
                        <output htmlFor="timeRange">
                            {timeRange.hours} hours, {timeRange.minutes} minutes
                        </output>
                    </div>
                </div>
            </div>

            <input type="submit" value="Search" />
        </form>
    );
}

export default OrgSearchRoomsForm;
