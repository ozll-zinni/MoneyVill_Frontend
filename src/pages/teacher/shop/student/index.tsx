import { css } from "@emotion/react"
import Card from "@/components/common/Card/Card"
import { useEffect } from "react"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getStudentProductsAPI } from "@/api/common/shop/getStudentProductsAPI"
import { getStudentProductsType } from "@/types/teacher/apiReturnTypes"
// import UseAnimations from "react-useanimations"
// import alertCircle from "react-useanimations/lib/alertCircle"

function student() {
	const {
		data: cardData,
		isError,
		isLoading,
		isFetching,
		error,
		isSuccess,
		refetch,
	} = useQuery<getStudentProductsType[]>(["studentProducts"], getStudentProductsAPI)

	console.log(cardData)

	return (
		<div css={wrapperCSS}>
			<div css={headerCSS}>
				<div css={titleCSS}>학생 상품</div>
			</div>
			<div css={subTitleCSS}>학생이 등록한 상품을 조회하고 등록, 수정 삭제할 수 있습니다.</div>
			{cardData?.length === 0 ? (
				<div css={noneWrapperCSS}>
					{/* <UseAnimations animation={alertCircle} size={300} strokeColor={"rgba(0,0,0,0.4)"} /> */}
					<h1>등록된 상품이 없습니다.</h1>
				</div>
			) : (
				<div css={cardWrapperCSS}>
					{cardData?.map((card) => (
						<Card
							key={card.id}
							id={card.id}
							title={card.title}
							amount={card.amount}
							image={card.images[0]}
							count={card.count}
							sold={card.sold}
							name={card?.name}
							date={card.date}
							assigned={card.assigned}
						/>
					))}
				</div>
			)}
		</div>
	)
}

const wrapperCSS = css`
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: var(--common-back-color-2);
	border-radius: 10px;
	padding: 30px;
`
const headerCSS = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
const titleCSS = css`
	font-size: var(--teacher-h1);
	font-weight: bold;
`
const subTitleCSS = css`
	font-size: 0.95rem;
	margin-top: 12px;
`

const cardWrapperCSS = css`
	margin-top: 30px;

	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-column-gap: 20px;
	grid-row-gap: 30px;
`

const noneWrapperCSS = css`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h1 {
		font-size: var(--teacher-h2);
	}
`

export default student
