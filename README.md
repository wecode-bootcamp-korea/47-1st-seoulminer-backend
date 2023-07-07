# **About team Seoulminer - mining codes**

- FrontEnd: [양회진](https://github.com/hjyang369)(project manager), [이지원](https://github.com/jiwon614118)
- BackEnd: [신동현](https://github.com/donghyeun02), [최리나](https://github.com/lchoe24), [하준수](https://github.com/joonsooha123)(product manager)
- 개발기간: 2023.06.23 ~ 2023.07.07
- 깃헙 링크
    - [FrontEnd](https://github.com/wecode-bootcamp-korea/47-1st-seoulminer-frontend)
    - [BackEnd](https://github.com/wecode-bootcamp-korea/47-1st-seoulminer-backend)
    

---

## Clone Coding project - 배민문방구

- 웹 개발의 첫 걸음을 뗀 seoulminers는 사람들이 가장 일상적으로 영위하는 행동 중 하나인 상거래를 웹페이지로 구현해 보기로 했다.
- 그러던 중 우리의 눈에 발견된 우아한형제들의 우아한 브랜드, [배민문방구](https://brandstore.baemin.com/)
- 우리에게 주어진 시간은 단 2주. 2번만의 스프린트 안에 최대한 클론 할 수 있는 범위 내에서 우당탕탕 이나마 굴러가는 프로덕트를 만들어 내야 한다.

---

## 우리가 구현해야 할 행위 - 전자상거래

인터넷이 우리 생활에 보급된 이래, 사람들이 현실세계에서 영위하는 행동들 중 많은 수가 온라인의 세계로 이식되었다. 특히 상거래는 단언컨대 유사 이래 가장 많이 수행된 사람과 사람 사이의 상호작용일 것이다. 인류의 근간을 이루는 상거래 행위부터 차근차근 구현해 보기로 했다.

구현에 앞서, PEFT 분석을 통해 개발 청사진을 그리고 방향성을 잡고자 한다.

---

## PEFT 분석

### Product: 우리의 프로덕트가 커버하는 제품과 서비스는 어떤 종류의 것일까? / What types of goods and services do our product provide?

1. eCommerce를 영위: 네트워크 상에서 이루어지는 제품의 거래
    1. 실제로 제품을 보고 구매의사결정을 내리는 것이 아닌, 웹페이지에 게시된 정보를 바탕으로 구매의사결정을 내리게 됨. 따라서 제공 가능한 선에서 상품에 대한 상세 정보를 제공할 수 있어야 함.
    2. 구매의사 결정 및 지불이 끝났다고 해서 바로 상품을 수령할 수 있지 않으므로, 상품의 인도에 있어 필요한 정보가 잘 관리되어야 함.
2. 취급품목: 재미있는 소품
    1. 특이하고 기성품이 아닌 이벤트성 상품을 판매함.
    2. 가격대도 높은 편이 아님. 부담없이 구매할 수 있는 수준.
    3. 예컨대, 친구에게 장난으로 선물하면 좋을 물건.

1. eCommerce service: the selling and purchasing of goods through the Internet
    1. The decision to purchase goods is not made through the direct interaction with the physical goods, but rather through the descriptions displayed on the web page. Thus, it is important to provide detailed information within the given limits. 
    2. Since it is not possible to receive the goods right after the purchase is complete, it is crucial to keep track of the necessary information for the delivery of the goods.
2. Main genre of the goods: fun items
    1. unique, hand-picked, non-mass-produced items
    2. relatively low prices; can be purchased without a burden
    3. items that would be good to give to a friend for fun purposes

### End-user: 우리의 프로덕트는 어떤 사람이 사용하게 될까? / Who are the users of our product?

1. 재미있는 소품을 사용할 만한 사람들
    1. 이 사람들은 특이한 물건을 사용하는 것을 / 특이한 선물을 하는 것을 좋아한다. 
    2. 따라서 주 이용 연령층은 max 30대 정도로 추정된다.
    3. 또한 일상적인 구매(식자재 구매와 같은)가 이뤄지는 것은 아니다.
    
    → 그렇기 때문에, 프로덕트의 접근성은 약간의 희생이 있어도 괜찮다.
    

1. People who find interest in fun items
    1. Users who enjoy collecting unique items / enjoy gifting fun presents
    2. Accordingly, we assume that the general age of our users would be max 30 years of age.
    3. It differs from everyday purchases such as grocery shopping
    
    → Because of this, the accessibility of the website can be sacrificed for the sake of highlighting other fun features
    

### Feature: 우리의 프로덕트는 어떤 기능을 가지고 있어야할까?

eCommerce를 운영하기 위해서는, 최소한 아래의 기능을 가지고 있어야 한다고 판단된다.

1. SignUp: 엔드유저를 인지하는 회원가입 기능.
    1. 어떤 사람이 어떤 품목을 얼마만큼 구매했는지를 알 수 있어야 한다. 이를 위해서는 해당하는 엔드유저를 특정할 수 있어야 하며, 회원가입을 통해 웹페이지 내의 활동에 대해 엔드유저를 특정할 수 있다.
    2. 아울러 특정 엔드유저의 주소지 등에 대한 정보도 관리해야 구매건에 대해 배송등의 사후처리도 수행할 수 있다.
    3. 따라서 회원가입 기능 및 엔드유저 정보 관리 기능은 이커머스에 있어 근간이 되는 기능이다.
2. SignIn: 엔드유저의 구매행위를 지원하고 분석하는 로그인 기능.
    1. 로그인 기능을 통해, 어떤 엔드유저가 웹페이지 상에서 어떤 행동을 취했는지 파악할 수 있다.
    2. 특히 eCommerce는 거래가 메인이 되는 만큼, 거래의 주체를 정확히 특정하고 파악할 수 있어야 한다. 이를 위해서는 로그인 기능은 필수다.
3. ProductView: 엔드유저에게 상품의 정보를 제공하는 상품조회 기능.
    1. 상품을 팔기 위해서는, 구매자가 해당 상품에 대한 정보를 제공받을 수 있어야 한다.
    2. 상품의 물리적 실체를 관찰하고 구매의사를 내릴 수 있는 것이 아니다 보니, 매체 안에서 제공할 수 있는 한도 안에서 최대한 상세한 정보를 전달해야 한다. 
    3. 상품의 리스트도 볼 수 있어야 하고, 개별상품에 대한 접근도 가능해야 한다.
4. Cart: 엔드유저가 구매의사가 있는 상품의 데이터를 저장하는 장바구니 기능.
    1. 엔드유저의 구매 편의성을 위해, 장바구니 기능을 제공해야 한다.
    2. 엔드유저는 로그인한 상태에서 본인이 구매하고자 하는 상품들을 담아두었다가 한번에 구매를 할 수 있어야 한다.
5. Order: 엔드유저의 구매이력을 확인, 확정하는 주문서 기능.
    1. 엔드유저가 구매한 상품에 대해, 판매자도 그 내역을 확인해야 상품의 배송 등의 사후절차를 진행할 수 있다.
    2. 아울러 관계법령 상 거래에 대한 정보는 일정 기간 보관되어야 한다.

### Tech: 우리가 사용할 기술스택

- 기술스택
    - fe : 자바스크립트, 리액트, SCSS
        - <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/sass-icon.svg" alt="icon" width="65" height="65" /></div>
    - be : javascript, node.js, express, mysql
        - <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div>
        - express
- 협업툴


<div>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>


---

## 구현 기능 상세

1. SignUp
    1. FE (양회진)
        1. 첫번째 페이지
            1. 레이아웃
            2. 약관동의 - 전체 동의 및 부분 동의
            3. 필수 체크 박스 누르면 버튼 활성화
            4. 백엔드에게 유저 정보 POST
        2. 두번째 페이지
            1. 레이아웃
            2. 정규표현식에 따라 유저정보 입력할 수 있으며 조건에 맞으면 버튼 활성화
            3. 회원가입 성공 시 축하 모달 띄워주고 3초 뒤에 자동으로 main 페이지로 이동
            4. 백엔드에게 유저 정보 POST
    2. BE (신동현)
        1. 이메일 및 비밀번호 정규 표현식 사용하여 조건을 검.
            1. 이메일 조건 : “계정@도메인.최상위도메인” 형식
            2. 비밀번호 조건 : 10-16자, 하나의 숫자 및 하나의 특수 문자 포함
        2. 이메일 및 전화번호가 중복될 시 에러 핸들링
        3. bcrypt를 사용한 비밀번호 암호화
2. SignIn
    1. FE (양회진)
        1. 레이아웃
        2. 입력창에 입력하면 버튼 활성화
        3. 백엔드에게 유저 정보 POST
    2. BE (최리나)
        1. bcrypt.compare()를 사용한 비민번호 확인
        2. 로그인 성공 시 jwt토큰 발급: 유저에게 안전과 보안의 혜택을 제공하며 회원 전용 기능에 대한 액세스 권한을 부여합니다.
3. ProductView
    1. FE 
        1. main page
            1. nav
                1. 양회진
                    1. 토큰 유무에 따른 로그인/ 로그아웃 버튼 변화
                    2. nav toggle에서 토큰 유무에 따른 로그인/ 로그아웃 UI 변화
                    3. 비로그인 시 장바구니 버튼 클릭 시 로그인 페이지로 이동
                    4. 쿼리스트링 이용해 카테고리 버튼 클릭 시 상품리스트페이지에 그에 맞는 정보 보여줌 GET
                2. 이지원
                    1. 로그아웃시 토큰 삭제
                    2. Nav 레이아웃, 토글
            2. footer
                1. 이지원
                    1. 레이아웃
            3. main
                1. 이지원
                    1. 레이아웃
                        1. 슬라이드 구현 3초에 한번씩 전환되고 버튼 클릭으로 바꿀 수 있음
                2. 양회진
                    1. 백엔드에게 정보 받아옴 GET
                    2. hover 시 이미지 및 글자 색 바뀌도록 구현
        2. 상품 리스트 page
            1. 이지원
                1. 레이아웃
                    1. 상품 목록 정렬 (최신순, 가격순)
            2. 양회진
                1. 쿼리스트링을 이용해 백엔드에게 카테고리에 맞는 정보 받아옴 GET
                2. 카테고리 ID에 따라 카테고리 제목 바뀌는 UI 구현
                3. hover 시 이미지 및 글자 색 바뀌도록 구현
        3. 상품 상세 page(양회진)
            1. 레이아웃
            2. 수량 올리면 총 금액 바뀌도록 구현
            3. 수량이 1이상이며 재고수량과 같거나 적을 때 장바구니, 바로구매 버튼 활성화
            4. 재고수량보다 많을 시 버튼 비활성화 되면서 재고부족 글 보여줌
            5. 장바구니 버튼 클릭 시 백엔드에게 해당 상품의 정보 보내줌 POST
            6. 장바구니 버튼 클릭 시 장바구니에 추가되었다는 alert 창 보여줌
            7. 바로구매 버튼 클릭 시 localStorage에 저장 후 구매 페이지로 넘어가서 정보 불러옴
            8. 현재 상품의 카테고리에 맞는 추천 상품 리스트 보여줌
            9. 상품정보/구매후기/상세정보 버튼에 따라 다른 UI 구현
            10. useParams 사용해 상품 별 정보 바뀌는 정보 받아옴 GET
        4. 404 page(양회진)
            1. 레이아웃
            2. 라우터 통해서 404페이지에는 nav, footer 안보이도록 구현
    2. BE (하준수)
        1. 구현 시 고려사항
            1. 상품 목록 출력: 단순히 전체 상품 목록을 출력하는 것이 아닌, 필터링, 소팅, 페이지네이션을 고려하여 다양한 곳에 활용할 수 있도록 구현해야 했음.
            2. 상품 상세내역 출력: DB 구조상 products 테이블이 product_options 테이블과 함께 엮여 있음을 고려하여, 상품 상세내역을 출력할 때 상품의 옵션 정보도 함께 조회할 수 있도록 구현해야 했음.
        2. 작동기전
            1. 상품 목록 출력
                1. Router 레벨: 엔드포인트 뒤의 쿼리스트링을 필터링, 소팅, 페이지네이션의 변수 인자로 받아 전달함.
                2. Controller 레벨: request로 전달받은 쿼리스트링을 정제하여 서비스 레벨로 전달함. 만약 전달받은 쿼리스트링이 없으면 디폴트값으로 설정하여 전달함.
                3. Service 레벨: 상품검색 기능 수행. 만약 미리 설정되지 않은 쿼리스트링 인자라면 에러메세지 토출하게 설정.
                4. Dao 레벨: 인자로 전달받은 쿼리스트링을 쿼리빌더를 통해 쿼리문으로 변환하고, 변환된 쿼리문을 적용한 상품목록 검색을 수행하여 반환함.
            2. 상품 상세내역 출력
                1. Router 레벨: 엔드포인트의 패스파라미터로서 product_id를 인식하여 전달.
                2. Controller 레벨: 전달받은 product_id를 정제하여 서비스 레벨에 전달.
                3. Service 레벨: 전달받은 product_id를 검색하는 로직 실행. 만약 존재하지 않는 product_id일 경우 에러메세지 토출하게 설정.
                4. Dao 레벨: 전달받은 product_id를 사용하여 상품상세내역 조회 쿼리문 실행. INNER JOIN문을 통해 products 테이블과 products_options 테이블을 엮어 조회하며, 중복되는 정보는 JSON_ARRAYAGG와 JSON_OBJECT를 사용하여 가독성 높임.
        3. 특기할만한 기술 / 코드 / 방법
            1. queryBuilder 모듈: Dao 레벨에서 사용하는 모듈. 쿼리스트링으로 전달되는 다양한 변수들을 Dao레벨에 적용하여 사용할수 있는 쿼리문으로 변환시켜줌.
4. Cart
    1. FE (이지원)
        1. 장바구니 상품 수량 변경
            1. 상품 수량 증가시 최종 구매 금액 변경
        2. 장바구니 선택 삭제 , 전체 삭제
            1. 체크 박스 클릭으로 전체 혹은 개별 선택 및 삭제
    2. BE (최리나)
        1. 어떤 상품이 장바구니 안에 있으면 중복상품을 넣는게 아니라 mySQL 쿼리 문 on duplicate key update를 사용해서 이미 있는 상품의 퀀티티를 업데이트함
        2. 토큰 통해 유저아이디 추출 후 유저아이디로 장바구니테이블의 데이터를 수정하는 로직 구성 (유저간에는 정보를 공유할 수 없게끔 구축)
        3. 장바구니에 상품을 추가/삭제/갯수 변경 하자마자 db를 바로 업데이트 함; 이유: 추후 비즈니스 의사 결정에 도움이 될 수 있는 빅데이터를 구축할 수 있는 가능성이 다분하므로 유저가 로그아웃을 해도 나중에 다시볼 수 있게 하기 위해 인벤토리보다 많이 담을 수 없게 하기 위해
5. Order
    1. FE (양회진)
        1. 모든 입력창 입력해야 버튼 활성화
        2. 결제수단 및 전체동의 체크박스 구현
        3. 장바구니에서 결제창으로 오는 경우와 바로구매로 오는 경우에 따라 다른 정보 불러옴
            1. 장바구니 : 백엔드에게 장바구니에 있는 상품 목록 받아옴
            2. 바로구매 : localStorage에 있는 상품 정보 꺼내서 보여주고 결제버튼 누르면 삭제됨
        4. 장바구니에 있던 물품 결제 시에는 구매 성공 모달 창 띄워줌
    2. BE (신동현)
        1. 구현 시 고려사항
            1. 주문 상태 : 결제 전, 결제 후
            2. 결제 : 포인트 차감 방식
        2. 작동기전
            1. 유저가 결제버튼을 누를 시 실행
            2. uuid로 주문번호 생성 후 인가 모듈로 해당 유저 아이디 파악
            3. 장바구니로 주문 시 해당 유저의 아이디로 장바구니 품목 조회 / 개별 품목일 시 req로 받아온 productId를 사용해 주문서 생성 (주문 상태 : 결제 전)
            4. 포인트 차감 로직을 사용하여 지불을 진행
            5. 주문서 상태 변경 (주문 상태 : 결제 후)
            6. 장바구니에서의 주문일 경우엔 해당 장바구니 품목들을 삭제
        3. uuid 사용하여 고유한 식별번호 부여 및 쿼리러너의 트랜잭션기능을 이용해 작동기전 구현 
        

---

## 데모영상

[Team SeoulMiners DEMO](https://youtu.be/t2XcuRR5fUA)

---

## 참고자료

- Notion Teamspace - Seoulminer
    
    [https://www.notion.so/Home-Seoulminer-6ec547cfd20d4b64949230fa66d3a34d?pvs=4](https://www.notion.so/Home-Seoulminer-6ec547cfd20d4b64949230fa66d3a34d?pvs=21)
    
- Trello - Ticket management
    
    [Trello](https://trello.com/b/UuPuThmi/teamseoulminer)
    
- dbdiagram - ERD
    
    [A Free Database Designer for Developers and Analysts](https://dbdiagram.io/d/6498e51a02bd1c4a5e0b0349)
    
- Postman - Seoulminer API
    
    [Seoulminer](https://documenter.getpostman.com/view/27927438/2s93zFXeiA)
    
- REACT
    
    [React – 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리](https://ko.legacy.reactjs.org/)
    

---

## 추가적으로 구현해보고 싶었던 것들

- 장바구니, 주문결제 기능 개선: 현재는 장바구니를 통해 주문결제된 상품에 대해 데이터를 DB에서 hard delete 하는 방식으로 관리중인데, 이럴 경우 엔드유저가 장바구니에 담았던 상품에 대해 과거 이력을 조회할 수 없다. soft delete 하는 형식으로 바꿔서 데이터 이력을 남기는 방식으로 수정해 보고 싶다. 이럴 경우 엔드유저가 장바구니에 담았던 상품에 대한 데이터를 쌓을 수 있어 비즈니스 의사결정에 도움을 줄 수 있을 것이다.
- 상품검색 기능: 검색기능의 경우, 근본적으로 필터링의 일종이라고 한다. 이번 프로젝트 스코프에서는 검색기능이 포함되지 않았는데, 다음 번 프로젝트를 진행할 때는 검색기능도 스코프 안에 포함시켜 구현해보고 싶다.
- 상품리뷰 작성 / 게재 / 조회 기능: 상품 관련 정보 제공에 있어, 실제 사용해 본 사람의 언급만큼 귀중한 정보가 없을 것이다.
- 어드민 기능: 엔드유저에는 고객도 있지만, 어드민도 있다. 서비스의 관리 측면에서 필요한 기능을 고민해 보고 싶다.
- 아이디저장: 세션 활용하여 프론트에서 저장 할 수 있는 기능. 다음 프로젝트때는 구현하고 싶음.
- 상품목록 정렬 (최신순, 가격순) : 벡엔드 서버와 통신하여 서버에서 정해놓은 상품 정렬 목록을 불러와 UI 로
    
    그려주는 작업.
    
- 소셜로그인: 엔드유저 입장에서 간편한 회원가입, 로그인 절차를 경험하게 할 수 있음.
- 제대로 된 PG 이식: 실제 현업에서 사용하는 PG기능도 도전해 보고 싶다.

---

## Reference

- 이 프로젝트는 [배민문방구](https://brandstore.baemin.com/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트 이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제가 될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것으로, 해당 프로젝트 외부인이 사용할 수 없습니다.

---
