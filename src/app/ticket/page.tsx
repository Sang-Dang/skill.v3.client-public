'use client'
import Header from "@/custom-components/Header"
import { useEffect, useState } from "react"
import { TagsOutlined } from '@ant-design/icons'
import Card from "@/custom-components/shop-page/Cart"
import { domain } from "@/api"

export default function Example() {

  const [products, setProducts] = useState<any>([])
  useEffect(() => {
    fetch(`${domain}/ticket-user`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data)
      })
  }, [])
  return (
    <>
      <Header />
      <Card />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              products ?
                products.map((product: any) => {
                  if (product.length === 0) return
                  return (
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          style={{
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
                          }}
                          src={`${domain}/file/image/${product.images[0]}`}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={`/ticket/detail/${product.id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.ticketName}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product?.price}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{product.quantity} <TagsOutlined /></p>
                      </div>
                    </div>
                  )
                })
                :
                <div>No available products now</div>
            }
          </div>
        </div>
      </div >
    </>
  )
}
