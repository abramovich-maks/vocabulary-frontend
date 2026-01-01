import {useAuth} from "../../composables/AuthContext";
import {GoToLink} from "../../components/GoToLink";

import {DescriptionSection, HeroBanner, HeroContent, PlayLinkContainer,} from "./HomePage.styles";

export default function HomePage() {
    const {isAuthenticated} = useAuth();

    return (
        <>
            <HeroBanner>
                <HeroContent>
                    {!isAuthenticated ? (
                        <h1>
                            Learn English <span>effectively</span>
                            <br/>
                            with <span>Spaced Repetition</span>
                        </h1>
                    ) : (
                        <h1>
                            Welcome back!
                            <br/>
                            Time for your <span>daily practice</span>
                        </h1>
                    )}
                </HeroContent>
            </HeroBanner>

            <PlayLinkContainer>
                {!isAuthenticated ? (
                    <>
                        <GoToLink to="/register">
                            Register <span>{">"}</span>
                        </GoToLink>
                        <GoToLink to="/login">
                            Login <span>{">"}</span>
                        </GoToLink>
                    </>
                ) : (
                    <>
                        <GoToLink to="/daily-test">
                            Start daily test <span>{">"}</span>
                        </GoToLink>
                        <GoToLink to="/words">
                            My dictionary <span>{">"}</span>
                        </GoToLink>
                    </>
                )}
            </PlayLinkContainer>

            <DescriptionSection>
                {!isAuthenticated ? (
                    <>
                        <h2>How it works</h2>
                        <p>
                            Vocabulary SRS helps you learn English words using
                            a proven method called <strong>Spaced Repetition</strong>.
                        </p>
                        <ol>
                            <li>Add your own words and translations</li>
                            <li>Practice them every day</li>
                            <li>The system adapts to your progress</li>
                            <li>You remember more with less effort</li>
                        </ol>
                    </>
                ) : (
                    <>
                        <h2>Why daily practice matters</h2>
                        <p>
                            Daily tests are generated based on your learning history.
                            Just a few minutes a day helps you remember words long-term.
                        </p>
                    </>
                )}
            </DescriptionSection>
        </>
    );
}
