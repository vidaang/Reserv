import React, { useState } from 'react';

function OrgSearchRoomsForm() {
    const [timeRangeOutput, setTimeRangeOutput] = useState('0 hours, 15 minutes');

    const handleTimeRangeChange = (e) => {
        const minutes = e.target.value;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        setTimeRangeOutput(`${hours} hours, ${remainingMinutes} minutes`);
    };

    return (
        <form action="../../../api/ProcessForm.php" method="post">
            <div className="entry-form-container">
                <div className="entry-form-row">
                    <entry-form-row-label htmlFor="dateRangeStart">Date Range:</entry-form-row-label>
                    <div className="entry-form-input">
                        <input type="date" id="dateRangeStart" name="dateRangeStart" required />
                        <entry-form-row-label>to</entry-form-row-label>
                        <input type="date" id="dateRangeEnd" name="dateRangeEnd" required />
                    </div>
                </div>

                <div className="entry-form-row">
                    <div className="entry-form-input">
                        <label htmlFor="timeRangeStart">Time Range:</label>
                        <input
                            type="range"
                            id="timeRange"
                            name="timeRange"
                            min="15"
                            max="1380"
                            step="15"
                            onChange={handleTimeRangeChange}
                        />
                        <output htmlFor="timeRange" id="timeRangeOutput">
                            {timeRangeOutput}
                        </output>
                    </div>
                </div>

                <div className="entry-form-row">
                    <entry-form-row-label htmlFor="attendees">Number of Attendees:</entry-form-row-label>
                    <div className="entry-form-input">
                        <input type="number" id="attendees" name="attendees" min="1" />
                    </div>
                </div>
            </div>
        
            <input type="submit" value="Search" />
        </form>
    );
}

export default OrgSearchRoomsForm;
