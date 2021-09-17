import { useContext, useEffect } from "react";
import { EssayContext } from "./providers/EssayProvider";

export const AllEssays = () => {
    const { essays, getEssays } = useContext(EssayContext)

    useEffect(() => {
        getEssays()
    }, [])

    const renderEssayItem = essay => {
        return (
            <div className="essay_item">
                {essay.topic}
                <br/>
                {essay.student.full_name}
                <br/>
                {essay.official_dd}
                <br/>
                {essay.floating_dd}
                <br/> <br/>
            </div>
        )
    }
    
    return (
        <>
            <main>
                <div className="essays_page_all">
                    <h3>All Essays</h3>
                    {
                        essays.map(essay => renderEssayItem(essay))
                    }
                </div>
            </main>
        </>
    )
}