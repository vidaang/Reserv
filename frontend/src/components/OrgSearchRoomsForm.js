import React from 'react';

function OrgSearchRoomsForm() {
    
    return (
        <form action="../../../api/ProcessForm.php" method="post">
            <div className="entry-form-row">
                <entry-form-row-label htmlFor="dateRangeStart">Date Range:</entry-form-row-label>
                <div className="entry-form-input">
                    <input type="date" id="dateRangeStart" name="dateRangeStart" required />
                    <p1>to</p1>
                    <input type="date" id="dateRangeEnd" name="dateRangeEnd" required />
                </div>
            </div>

            <div className="entry-form-row">
                <entry-form-row-label htmlFor="timeRangeStart">Time Range:</entry-form-row-label>
                <div className="entry-form-input">
                    <input
                        type="range"
                        id="timeRange"
                        name="timeRange"
                        min="0"
                        max="1380"
                        step="15"
                    />
                    <output htmlFor="timeRange" id="timeRangeOutput">0 hours, 0 minutes</output>
                </div>
            </div>

            <div className="entry-form-row">
                <entry-form-row-label htmlFor="attendees">Attendees:</entry-form-row-label>
                <div className="entry-form-input">
                    <input type="number" id="attendees" name="attendees" min="1" />
                </div>
            </div>

            <input type="submit" value="Search" />
        </form>
    );
}

export default OrgSearchRoomsForm;
