const Carousal = () => {
    return (
            <div className="w-fit max-h-96  carousel">
                <div className="carousel-item w-full">
                    <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80" className="w-full" alt="Tailwind CSS Carousel component" />
                </div>
                <div className="carousel-item w-full">
                    <img src="/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
                </div>
            </div>
    )
}

export default Carousal