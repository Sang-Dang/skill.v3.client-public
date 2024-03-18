'use client'
import { Button, Result, Spin, message } from 'antd'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function page({ }: Props) {

    function loading() {
        message.loading('', .5);
    };
    return (
        <Result
            status="success"
            title="Successfully Purchased!"
            subTitle="Email confirm your order takes 1-5 minutes, please wait."
            extra={[
                <>
                    <Link href={'/'}>
                        <Button type="primary" key="console" onClick={loading}>
                            Go Home
                        </Button>
                    </Link>
                    <Link href={'/shop'}>
                        <Button key="buy" onClick={loading}>Buy Again</Button>
                    </Link>
                </>
            ]}
        />
    )
}