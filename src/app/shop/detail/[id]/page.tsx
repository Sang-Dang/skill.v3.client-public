'use client'
import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import Header from '@/custom-components/Header'
import Card from '@/custom-components/shop-page/Cart'
import { addToCart } from '@/custom-components/shop-page/CartAction'
import { domain } from '@/api'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<any>()
  const [onChange, setOnChange] = useState<boolean>(false)

  useEffect(() => {
    console.log('option', selectedSize);
  }, [selectedSize])

  useEffect(() => {
    var id = window.location.pathname.split('/')[3]
    fetch(`${domain}/product/` + id)
      .then((res) => res.json())
      .then((json) => {
        if (json.statusCode === 200) {
          setProduct({
            breadcrumbs: [
              { id: 1, name: 'Shop', href: '/shop' },
            ],
            ...json.data,
            options: json.data.products.map((opt: any) => {
              return {
                product_name: json.data.name,
                name: opt.name,
                inStock: opt.quantity > 0,
                price: opt.price,
                id: opt.id,
                image: json.data.images[0]
              }
            })
          })
        } else {
          window.location.href = '/404'
        }
      })
      .catch((err) => {
        window.location.href = '/404'
      })
  }, [])

  return (
    <div>
      <Header />
      <Card onChange={onChange} />
      {
        product ?
          (
            <div className="bg-white">
              <div className="pt-6">
                <nav aria-label="Breadcrumb">
                  <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {product.breadcrumbs.map((breadcrumb: any) => (
                      <li key={breadcrumb.id}>
                        <div className="flex items-center">
                          <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                            {breadcrumb.name}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-300"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      </li>
                    ))}
                    <li className="text-sm">
                      <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        {product?.name}
                      </a>
                    </li>
                  </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      src={`${domain}/file/image/${product?.images[0]}`}
                      alt={product?.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={`${domain}/file/image/${product?.images[1]}`}
                        alt={product?.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        src={`${domain}/file/image/${product?.images[2]}`}
                        alt={product?.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      src={`${domain}/file/image/${product?.images[3]}`}
                      alt={product?.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
                  </div>

                  {/* Options */}
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    {
                      selectedSize ?
                        (
                          <p className="text-3xl tracking-tight text-gray-800">
                            {selectedSize?.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'}
                          </p>
                        )
                        :
                        (
                          <p className="text-3xl tracking-tight text-gray-200">Select option</p>
                        )
                    }

                    <div className="mt-10">
                      <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                        <RadioGroup.Label className="sr-only">Choose a option</RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {product?.options.map((opt: any) => (
                            <RadioGroup.Option
                              key={opt.price}
                              value={opt}
                              disabled={!opt.inStock}
                              className={({ active }) =>
                                classNames(
                                  opt.inStock
                                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                  active ? 'ring-2 ring-indigo-500' : '',
                                  'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">{opt?.name}</RadioGroup.Label>
                                  {opt.inStock ? (
                                    <span
                                      className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-500' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-md'
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                      </svg>
                                    </span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <button
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-rose-700 px-8 py-3 text-base font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        addToCart({ ...selectedSize })
                        setOnChange(!onChange)
                      }}
                    >
                      Add to cart
                    </button>
                  </div>

                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Description and details */}
                    <div>
                      <h3 className="sr-only">Description</h3>

                      <div className="space-y-6">
                        <p className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: product?.description }}></p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )
          :
          (
            <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
              <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">Loading...</p>
              </div>
            </div>
          )
      }
    </div>
  )
}
