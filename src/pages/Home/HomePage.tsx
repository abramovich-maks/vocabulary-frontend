import {useAuth} from "../../composables/AuthContext";
import {GoToLink} from "../../components/GoToLink";
import {
    ButtonContainer,
    ComingSoonList,
    FeatureCard,
    FeaturesGrid,
    HeroBanner,
    HeroContent,
    PageWrapper,
    Section,
    SectionDescription,
    SectionTitle,
    TagLine
} from "./HomePage.styles";

export default function HomePage() {
    const {isAuthenticated} = useAuth();

    return (
        <PageWrapper>
            <HeroBanner>
                <HeroContent>
                    <h1>
                        {!isAuthenticated ? (
                            <>
                                Learn words <span>the way</span> that works <span>best for you</span>
                            </>
                        ) : (
                            <>
                                Welcome back!
                                <br/>
                                Time for your <span>daily practice</span>
                            </>
                        )}
                    </h1>
                </HeroContent>

                <ButtonContainer>
                    {!isAuthenticated ? (
                        <>
                            <GoToLink to="/register" $primary>
                                Get started →
                            </GoToLink>

                            <GoToLink to="/login" $secondary>
                                I already have an account
                            </GoToLink>
                        </>
                    ) : (
                        <>
                            <GoToLink to="/daily-test" $primary>
                                Start daily test →
                            </GoToLink>

                            <GoToLink to="/words" $secondary>
                                My dictionary
                            </GoToLink>
                        </>
                    )}
                </ButtonContainer>
            </HeroBanner>

            {!isAuthenticated && (
                <>
                    <Section>
                        <SectionTitle icon="🔹">Core Idea</SectionTitle>
                        <SectionDescription>
                            Learn words the way that works best for you. Create your own word groups,
                            study them step by step, and stay focused only on the vocabulary you really need.
                        </SectionDescription>
                    </Section>

                    <Section>
                        <SectionTitle icon="🔹">Key Features</SectionTitle>
                        <FeaturesGrid>
                            <FeatureCard>
                                <h3>📚 Personal Word Groups</h3>
                                <p>
                                    Create thematic groups of words: travel, work, IT, everyday language —
                                    whatever matters to you. No chaos. No endless word lists.
                                </p>
                            </FeatureCard>

                            <FeatureCard>
                                <h3>🌍 Multi-Language Support</h3>
                                <p>
                                    The interface and translations adapt to your language.
                                    You see only what is truly useful for you.
                                </p>
                            </FeatureCard>
                        </FeaturesGrid>
                    </Section>

                    <Section>
                        <SectionTitle icon="🚀">Coming Soon</SectionTitle>
                        <ComingSoonList>
                            <li>Irregular verbs with a convenient learning format</li>
                            <li>Extended vocabulary sets</li>
                            <li>Improved tools for review and repetition</li>
                        </ComingSoonList>
                        <TagLine>The app grows together with you.</TagLine>
                    </Section>
                </>
            )}

            {isAuthenticated && (
                <Section>
                    <SectionTitle icon="📖">Your Learning Journey</SectionTitle>
                    <SectionDescription>
                        Daily tests are generated based on your learning history.
                        Just a few minutes a day helps you remember words long-term.
                    </SectionDescription>
                    <FeaturesGrid>
                        <FeatureCard>
                            <h3>📚 Your Groups</h3>
                            <p>
                                Organize words into custom groups. Study what matters to you most.
                            </p>
                        </FeatureCard>

                        <FeatureCard>
                            <h3>🎯 Daily Practice</h3>
                            <p>
                                Review words at optimal intervals. Build consistent learning habits.
                            </p>
                        </FeatureCard>
                    </FeaturesGrid>
                </Section>
            )}
        </PageWrapper>
    );
}