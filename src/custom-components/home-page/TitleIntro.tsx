import { Col, Row } from 'antd'
import React from 'react'
import { Button } from 'antd'

type Props = {}

export default function TitleIntro({ }: Props) {
  return (
    <Row style={{
      position: 'absolute',
      top: '50%',
      left: '45%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Col span={24}>
        <h1>Invest at the perfect time.</h1>
      </Col>
      <Col span={24}>
        <div style={{
          fontSize: '1.3rem',
          fontWeight: 300,
          lineHeight: '1.5rem',
          marginBottom: '2rem',
          width: '35rem'
        }}>
          By leveraging insights from our network of industry insiders,
          you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={[10, 10]}>
          <Col>
            <Button>Mua ngay</Button>
          </Col>
          <Col>
            <Button>Video giới thiệu</Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <div style={{
          fontSize: '.9rem',
          fontWeight: 'bold',
          lineHeight: '1.5rem',
          marginTop: '2rem',
          width: '30rem'
        }}>
          Sponsors
        </div>
        <Row gutter={[20, 20]}>
          <Col>
            <img src='image/forbes.svg' alt='sponsor 1' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
          <Col>
            <img src='image/techcrunch.svg' alt='sponsor 2' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
          <Col>
            <img src='image/wired.svg' alt='sponsor 3' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
          <Col>
            <img src='image/cnn.svg' alt='sponsor 4' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col>
            <img src='image/bbc.svg' alt='sponsor 1' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
          <Col>
            <img src='image/cbs.svg' alt='sponsor 2' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
          <Col>
            <img src='image/fastcompany.svg' alt='sponsor 3' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
          <Col>
            <img src='image/huffpost.svg' alt='sponsor 4' style={{ height: '2rem', margin: '1rem 0 1rem 0' }} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}