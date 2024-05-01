import { Container } from '@/app/(homepage)/utils/Container';
import { FadeIn } from '@/app/(homepage)/utils/FadeIn';
import { List, ListItem } from '@/app/(homepage)/utils/List';
import { SectionIntro } from '@/app/(homepage)/utils/SectionIntro';
import { StylizedImage } from '@/app/(homepage)/utils/StylizedImage';
import image from '@/app/(homepage)/images/group-activities.png';

export default function Activities() {
    return (
        <div>
            <SectionIntro title="Event activties" className="">
                <p>
                    Prior to the main event, various activities have been undertaken by the organizers to promote
                    program awareness and communication.
                </p>
            </SectionIntro>
            <Container className="mt-16">
                <div className="lg:flex lg:items-center lg:justify-end">
                    <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
                        <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
                            <StylizedImage
                                src={image}
                                sizes="(min-width: 1024px) 41rem, 31rem"
                                className="justify-center lg:justify-end"
                            />
                        </FadeIn>
                    </div>
                    <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
                        <ListItem title="TEDxDay - May 06, 2024">
                            A special occasion of TEDx is dedicated to communicating and promoting program information
                            to participants. Additionally, signature merchandise items are also showcased and available
                            for purchase.
                        </ListItem>
                        <ListItem title="Nghe bài nói - May 12, 2024">
                            This is the main activity eagerly anticipated by everyone when holding a ticket to the
                            event. Attendees will immerse themselves in a jubilant and dignified atmosphere, gathering
                            to listen to valuable insights from the event&apos;s distinguished speakers.
                        </ListItem>
                        <ListItem title="Event Experience - May 12, 2024">
                            A series of interconnected interactive activities within the &quot;Event Experience&quot;
                            will provide the audience with opportunities to share insights and gain a deeper
                            understanding of the theme of Season 4.
                        </ListItem>
                    </List>
                </div>
            </Container>
        </div>
    );
}
