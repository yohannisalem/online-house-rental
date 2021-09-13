import React from 'react'
import { Feed } from 'semantic-ui-react'


const date = '3 days ago'
const summary = 'Laura Faucet created a post'
const extraText = "Have you seen what's going on in Israel? Can you believe it."
const FeedBacks = () => {
    return (
        <div >
            <Feed>
                <Feed.Event
                    date={date}
                    summary={summary}
                    extraText={extraText}
                />

                <Feed.Event>
                    
                    <Feed.Content date={date} summary={summary} extraText={extraText} />
                </Feed.Event>

                <Feed.Event>
                    
                    <Feed.Content>
                        <Feed.Date content={date} />
                        <Feed.Summary content={summary} />
                        <Feed.Extra text content={extraText} />
                    </Feed.Content>
                </Feed.Event>
            </Feed>
        </div>
    )
}

export default FeedBacks
