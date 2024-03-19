import { Button, Col, Row } from 'antd'
import React from 'react'
import Image from "next/image";
import { FacebookOutlined, InstagramOutlined, SelectOutlined } from '@ant-design/icons';
import Link from 'next/link';
import logo from '/public/logo.svg'

type Props = {}


export default function Header({ }: Props) {
    return (
        <Row style={{
            padding: '1rem',
            height: 'fit-content',
            width: '100vw',
            userSelect: 'none',
        }} justify={'center'} align='middle'>
            <Col
                sm={{ span: 24 }}
                lg={{ span: 18 }}
            >
                <Row align='middle' gutter={[20, 20]}>
                    <Col
                        sm={{ span: 24 }}
                        lg={{ span: 6 }}
                    >
                        <Link href={'/'}>
                            <Image src={logo} alt='skillcetera logo' width={200} height={200} style={{
                                height: '3rem',
                                objectFit: 'cover',
                                userSelect: 'none',
                            }} />
                        </Link>
                    </Col>
                    <Col
                        sm={{ span: 24 }}
                        lg={{ span: 18 }}
                    >
                        <Row gutter={[20, 20]} align='middle'>
                            <Col>
                                <Link href='/event' style={{ color: 'black', fontSize: '1rem' }}>Event</Link>
                            </Col>
                            <Col>
                                <Link href='/shop' style={{ color: 'black', fontSize: '1rem' }}>Shop</Link>
                            </Col>
                            <Col>
                                <Link href='/about' style={{ color: 'black', fontSize: '1rem' }}>About us</Link>
                            </Col>
                            <Col className='lg:hidden'>
                                <Button>Login <SelectOutlined /></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col
                sm={{ span: 0 }}
                lg={{ span: 4 }}
            >
                <Row gutter={[10, 10]} align='middle' justify={'end'}>
                    <Col className='hidden lg:block'>
                        <a target='blank' href='https://www.facebook.com/skillcetera'>
                            <FacebookOutlined style={{ fontSize: '26px', color: '#08c', alignItems: 'center' }} />
                        </a>
                    </Col>
                    <Col className='hidden lg:block'>
                        <a target='blank' href='https://www.instagram.com/skillcetera'>
                            <InstagramOutlined style={{ fontSize: '26px', color: '#E4405F', alignItems: 'center' }} />
                        </a>
                    </Col>
                    <Col style={{ userSelect: 'none' }} className='hidden lg:block'>
                        |
                    </Col>
                    <Col className='hidden lg:block'>
                        <Button>Login <SelectOutlined /></Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}