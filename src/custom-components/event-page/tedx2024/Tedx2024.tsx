import React from 'react'
import Banner from './Banner'
import Intro from './Intro'
import TicketInfo from './TicketInfo'
import Sponsor from './Sponsor'
import Organizer from './Organizer'

type Props = {}

export default function Tedx2024({ }: Props) {
  return (
      <>
          <Banner />
          <Intro />
          <TicketInfo />
          <Organizer />
          {/* <Sponsor /> */}
      </>
  );
}