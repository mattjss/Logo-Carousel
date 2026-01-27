import LogoCarousel from './LogoCarousel'

interface ProductCardProps {
  width: number
  height: number
  label: string
}

function ProductCard({ width, height, label }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xs text-neutral-500 uppercase tracking-wider">
        {label}
      </div>
      <div
        className="bg-black rounded-lg p-5 shadow-lg flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="w-full">
          <LogoCarousel />
        </div>
      </div>
    </div>
  )
}

function ProductCardPreview() {
  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center gap-12 py-12">
      <h1 className="text-white text-2xl font-semibold mb-4">
        Logo Carousel - Product Card Preview
      </h1>
      
      <div className="flex flex-col gap-12">
        <ProductCard width={306} height={246} label="306 × 246" />
        <ProductCard width={363} height={303} label="363 × 303" />
        <ProductCard width={424} height={362} label="424 × 362" />
      </div>
      
      <div className="text-neutral-500 text-xs mt-8 text-center max-w-md">
        <p>Carousel specs: 24px logos, 16px gap, 24px side padding</p>
        <p className="mt-1">Container: max-w-sm (384px), h-16 (64px)</p>
      </div>
    </div>
  )
}

export default ProductCardPreview
