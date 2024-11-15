import React, { useEffect, useRef, useState } from "react"
import { SerializedStyles, css } from "@emotion/react"

type CarouselProps = {
  content: React.ReactNode[]
  identifier: string
  scrollToRecent?: boolean
  css?: SerializedStyles
}

function Carousel({ content, identifier, scrollToRecent, ...props }: CarouselProps) {
  const contentsRef = useRef<(HTMLDivElement | null)[]>([])
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const [standard, setStandard] = useState<number>(0)

  const renderContent = content?.map((el: React.ReactNode, idx: number) => {
    return (
      <div 
        id={`${idx}`} 
        key={`${identifier}-${idx}`} 
        ref={el => {
          if (contentsRef.current) {
            contentsRef.current[idx] = el
          }
        }}
      >
        {el}
      </div>
    )
  })

  const test = () => {
    console.log(contentsRef)
  }

  useEffect(() => {
    if (contentsRef.current) {
      contentsRef.current.forEach((item) => {
        if (item) {
          getVisibleContent.observe(item)
        }
      })
    }
  }, [content])

  useEffect(() => {
    if (scrollToRecent === true && contentWrapperRef.current) {
      contentWrapperRef.current.scrollTo({
        left: 99999999,
        top: 0,
        behavior: "smooth",
      })
    }
  }, [contentsRef.current.length])

  const options = {
    threshold: 0.1,
  }

  const getVisibleContent = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target instanceof HTMLElement) {
        if (entry.isIntersecting) {
          entry.target.classList.add(`${identifier}-visible`)
        } else {
          entry.target.classList.remove(`${identifier}-visible`)
        }
      }
    })
  }, options)

  const prevBtnHandler = () => {
    if (contentWrapperRef.current) {
      const visibleContents = document.querySelectorAll(`.${identifier}-visible`)
      const getWrapperCalc = contentWrapperRef.current.offsetLeft + contentWrapperRef.current.clientWidth
      const target = visibleContents.length <= 1 ? Number(visibleContents[0].id) : Number(visibleContents[0].id) + 1

      const targetEl = contentsRef.current[target]
      if (targetEl) {
        contentWrapperRef.current.scrollTo({
          left: targetEl.offsetLeft - getWrapperCalc,
          top: 0,
          behavior: "smooth",
        })
      }
    }
  }

  const nextBtnHandler = () => {
    if (contentWrapperRef.current) {
      const visibleContents = document.querySelectorAll(`.${identifier}-visible`)
      const target =
        visibleContents.length <= 1
          ? Number(visibleContents[visibleContents.length - 1].id) + 1
          : Number(visibleContents[visibleContents.length - 1].id)

      const targetEl = contentsRef.current[target]
      if (targetEl) {
        contentWrapperRef.current.scrollTo({
          left: targetEl.offsetLeft,
          top: 0,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <div {...props}>
      <div css={carouselWrapperCSS} onClick={test}>
        <div
          css={[indicatorBtn, prevBtn]}
          onClick={prevBtnHandler}
          onMouseEnter={(event) => {
            event.stopPropagation()
          }}
        >
          〈
        </div>
        <div
          css={[indicatorBtn, nextBtn]}
          onClick={nextBtnHandler}
          onMouseEnter={(event) => {
            event.stopPropagation()
          }}
        >
          〉
        </div>

        <div ref={contentWrapperRef} css={contentWrapperCSS}>
          {renderContent}
        </div>
      </div>
    </div>
  )
}

const carouselWrapperCSS = css`
	height: 100%;
	position: relative;
`

const contentWrapperCSS = () => {
	return css`
		width: 100%;
		height: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
		border-radius: 10px;
		display: flex;

		&::-webkit-scrollbar {
			display: none;
		}
	`
}

const indicatorBtn = css`
	z-index: 9;
	position: absolute;

	height: 100%;
	display: flex;
	align-items: center;
	font-size: 48px;
	font-weight: 700;
	color: rgba(0, 0, 0, 0.6);
	padding-left: 8px;
	padding-right: 8px;

	transition-property: font-size;
	transition-duration: 0.2s;
	cursor: pointer;
	user-select: none;

	@media (max-width: 480px) {
		display: none;
	}
`

const prevBtn = () => {
	return css`
		left: 0;

		&:hover {
			font-size: 54px;
		}
	`
}

const nextBtn = () => {
	return css`
		right: 0;

		&:hover {
			font-size: 54px;
		}
	`
}

export default Carousel
