## 💻 @gather_here

<img src="https://github.com/user-attachments/assets/4d63e8b7-789a-4512-8b70-78a2ad71565f" alt="gather_here 대표이미지" width="800px" />

## 📖 소개 및 개요

#### <img src="https://github.com/user-attachments/assets/42e201d2-f6e9-4269-bd09-37108d5f649e" alt="frontend" style="width: 16px; vertical-align: middle; margin-right: 5px;"/> 서비스 소개 <img src="https://github.com/user-attachments/assets/855c502b-ea52-4f41-b94a-3d1763eee7b9" alt="frontend" style="width: 16px; vertical-align: middle; margin-right: 5px;"/>

- 배포 URL : [🔗 @gather_here](https://www.gatherhere.dev/all)
- `@gather_here`는 개발자, 디자이너, 기획자 등 9개의 IT 직군 종사자들과 IT 직군 취업을 목표로 하는 준비생들을 연결해주는 플랫폼입니다.
- 회원가입 시 한 번의 설문으로 나의 정보를 등록해 서비스를 편리하게 이용할 수 있습니다.
- 사용자들은 원하는 프로젝트나 스터디 멤버를 모집하기 위해 게시글을 작성할 수 있으며, 지역 또는 유형별로 게시물을 구분해 볼 수 있습니다.
- 북마크 기능을 통해 원하는 게시물을 저장하고, 북마크한 글과 내가 작성한 글을 한눈에 확인할 수 있습니다.
- 사용자들은 자신에게 맞는 프로젝트와 스터디를 오픈 채팅이나 기재된 연락처를 통해 소통하며 진행할 수 있습니다.
- IT 행사 관련 정보는 캘린더를 통해 한눈에 확인할 수 있습니다.
- HUB 페이지를 통해 사용자들이 정보를 등록할 수 있고, 스터디나 프로젝트 동료를 모집할 수 있습니다.

## ✨ @gather_here 구경하기

<details>
<summary>목차</summary>
   
- [팀 소개](#teamintro)
- [아키텍쳐](#architecture)
- [ERD](#erd)
- [주요 기술](#skill)
- [기술적 의사결정](#technical)
- [프로젝트 구조](#structure)
- [UI](#ui)
- [트러블슈팅](#troubleshooting)

</details>

## <h3 id="teamintro">1.📢 팀 소개</h3>

<p>안녕하세요! 3명의 프론트엔드 개발자와 1명의 디자이너로 구성된 <strong>게더 히어</strong>팀입니다.<br>
`게더 히어`는 각기 다른 역량을 가진 우리가 모여, 협업의 시너지를 극대화 시킨다 라는 의미를 가지고 있습니다. 🔥<br>
</p>

|                                                            👑김영범                                                            |                                                             💻조은영                                                              |                                                                   💡김성준                                                                   |                                                              🎨전정현                                                              |
| :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|            <img src="https://github.com/user-attachments/assets/8720fef6-8ab1-4350-b9a4-068548e70e1e" width="200">             |              <img src="https://github.com/user-attachments/assets/b5f761ab-9343-4726-9a70-32e0745567dc" width="200">              |                   <img src="https://github.com/user-attachments/assets/819e65bc-ca66-4dcd-870d-80b6a4c3dbb2" width="200">                    |              <img src="https://github.com/user-attachments/assets/f394d0c9-314a-441e-8683-7f35e12f49f2" width="200">               |
| ![Team%20Leader](https://img.shields.io/badge/-Team%20leader-yellow) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Deputy%20Leader](https://img.shields.io/badge/-Deputy%20Leader-green) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![WorkManagement](https://img.shields.io/badge/-Work%20Management%20leader-f67280) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Design%20Leader](https://img.shields.io/badge/-Design%20leader-purple) ![Designer](https://img.shields.io/badge/Designer-004088) |
|                                         github:<br> [kybaq](https://github.com/kybaq)                                          |                                      github:<br> [Eunyoung](https://github.com/Eunyoung-Jo)                                       |                                          github:<br> [SeongJun](https://github.com/ilovezerocokeya)                                          |                                     blog:<br> [Junghyun](https://velog.io/@yardvvorker/posts)                                      |

## <h3 id="architecture">2. 🏗 아키텍쳐</h3>

<img src="https://github.com/user-attachments/assets/48b45708-f3b6-4f25-b737-07783d6ee884" alt="image" width="800px" />

## <h3 id="erd">3. 📚 ERD</h3>

<img src="https://github.com/user-attachments/assets/af11dffe-0540-4641-acc6-5e22dfc7b066" alt="image" width="800px" />

## <h3 id="skill">4.🍀주요 기능</h3>

<details>
  <summary>로그인</summary>
   
   - 소셜로그인(구글, 카카오, 깃허브)으로 간편하게 로그인을 할 수 있습니다.
   - 처음 소셜로그인을 하는 유저는 간단한 정보를 받습니다.
   - 이미 한번 정보를 받았던 기존의 유저의 경우에 소셜로그인을 하게되면 바로 메인페이지로 이동합니다.
   - 이러한 절차가 번거롭게 느껴지는 유저들을 위한 건너뛰기 기능은 회원에게 default data를 주어서 나중에 필요시 마이페이지에서 따로 정보를 추가할 수 있게 만들었습니다.
   - 간단한 정보를 받는 마지막 단계로서 닉네임은 필수로 받으며, 중복체크와 공백체크를 합니다.
   - 포트폴리오 주소를 저장하기 위한 URL은 선택사항으로서 작성하지 않고 넘어가면 다시 한 번 알림창으로 확인을 거치고 나서 프로필 저장을 할 수 있게 됩니다.
   - 프로필 저장을 통해서 최종적으로 DB에 유저의 정보가 저장되면 마지막 Welcome페이지를 볼 수 있습니다. 
</details>

<details>
  <summary>메인 페이지</summary>
 
- 검색기능
- 전체 / 스터디 / 프로젝트 / IT행사 분류
- 게시물 리스트 :  IT행사를 제외한 모든 탭의 전체 게시물을 최신글 순으로 보여줌
- 사이드 요소
    - 캘린더 : 행사가 있는 일자를 표시해주고, 해당 포인터를 클릭하면 미리보기로 정보를 보여주고, 토글버튼을 클릭하면 행사일정이 리스트로 보여지게 됩니다.
    - 오픈톡 : 로그인한 모든 유저들이 참여할 수 있는 채팅방입니다.
    - 멤버카드 : 본인의 정보를 등록한 유저들을 확인하고, 팀원으로 섭외할 수 있습니다.
- 스터디 / 프로젝트 / IT행사 페이지에서는 마감임박한 게시물을 캐러셀로 보여줌
- 직군 / 방식 / 지역 / 기간 필터로 사용자가 원하는 글만 선택하여 볼 수 있습니다.
- IT 행사 탭을 만들어 정보를 리스트 형식으로 편하게 볼 수 있드록 구현하였습니다.
- 행사 정보중 마감이 임박한 행사를 상단에서 슬라이드로 볼 수 있게 구현하였습니다.
  </details>

<details>
  <summary>글 작성 페이지</summary>

- 사용자가 사람을 구하고 싶은 스터디/ 프로젝트를 원하는 직군, 스택 등에 맞게 선택하여 작성할 수 있습니다.
- 임시저장 기능을 구현해 유저가 글쓰기 화면에서 이탈해야 할 경우 임시저장 버튼을 누른다면 이후에 글쓰기 페이지에 들어왔을때 해당 시점의 데이터를 다시 불러올 수 있게 했습니다.
- 본인이 쓴 글에서 수정하기 버튼을 누르면 작성했던 필드값 그대로 다시 작성 페이지에서 수정할 수 있습니다.

</details>

<details>
  <summary>공고 상세페이지</summary>

- 상세 페이지에서 확인하고 싶은 공고의 상세 정보들을 확인할 수 있습니다.
- 공유하기 버튼으로 url 복사를, 북마크 버튼으로 관심글 저장을 할 수 있습니다.
- 본인이 쓴 글인 경우 북마크 옆에 버튼을 따로 만들어 게시글 수정, 삭제가 가능하게 했습니다.
- 본인이 쓴 글이 아닐 경우 해당 버튼은 노출되지 않게 하였습니다.
</details>

<details>
  <summary>행사 상세</summary>
   
- 상세 페이지에서 흥미있는 행사의 상세 정보를 확인할 수 있습니다.
- 공유하기 버튼으로 url 복사를, 북마크 버튼으로 관심글 저장을 할 수 있습니다.
- 신청하기 버튼을 누르면 해당 사이트의 신청 페이지로 이동합니다.

</details>

<details>
  <summary>마이페이지</summary>
   
  - 마이페이지 네비게이션 
    - 마이페이지 내에 따로 네비게이션이 있어, 마이페이지 정보를 편하게 확인할 수 있습니다. 
  - 프로필 사진 수정
    - 직군별 아이콘으로 설정 : `gather_here`만의 9개의 직군 아이콘으로 프로필 사진 설정이 가능합니다.
    - 프로필 변경 : 사용자가 원하는 프로필 사진으로도 설정 가능합니다.
  - 내정보 수정
    - 회원가입시 입력한 정보 수정 : 회원가입시 입력한 정보를 언제든지 수정 가능합니다. 
   - 내 작성글
     - 내 작성글 확인 : 내 작성글을 한눈에 볼 수 있습니다. 
     - 내 작성글 수정, 삭제 : 내 작성글 카드를 호버하면 수정버튼, 삭제버튼이 나타나, 바로 수정,삭제 가능합니다.
    - 내 관심글
     - 내 관심글 확인 : 내가 북마크한 게시글을 스터디/ 프로젝트 / IT 행사 별로 한눈에 볼 수 있습니다. 
</details>

## <h3 id="technical">5.🧩 기술적 의사결정</h3>

### 프레임워크

<div>
  <h4>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white">
  </h4>
  <p>Next.js는 페이지 간 코드를 자동으로 분할하여 초기 로딩 시간을 줄여줍니다. 특히, Next.js의 App Router는 서버 컴포넌트를 지원하며, 기존 페이지 라우터보다 더 유연하고 다양한 기능을 제공해줍니다. 실시간 데이터 통신이 중요한 애플리케이션에서는 이 기능들이 성능 최적화에 큰 도움이 됩니다. 이러한 이유로, 동적인 데이터를 처리하는 데 최적화된 Next.js App Router를 프레임워크로 선택했습니다.</p>
</div>

### 상태 관리

<div>
  <h4>
    <img src="https://img.shields.io/badge/ContextAPI-61DAFB?style=flat-square&logo=React&logoColor=white">
  </h4>
  <p>Context API는 프로젝트에서 users 테이블의 정보를 여러 컴포넌트에서 공유해야 했기 때문에 전역 상태 관리 도구로 사용했습니다. 외부 라이브러리 없이 간단하게 설정할 수 있으며, 특정 컴포넌트 트리 내에서 상태를 공유하고 업데이트하는 데 매우 적합합니다. 이를 통해 코드의 복잡성을 줄이고 데이터 관리의 일관성을 유지할 수 있었습니다.</p>
</div>

### BaaS

<div>
  <h4>
    <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=Supabase&logoColor=white">
  </h4>
  <p>Supabase는 백엔드 구성에 필요한 시간을 크게 단축시켜줍니다. 또한 실시간 데이터 동기화 기능과 다양한 데이터베이스 기능을 제공하여 생산성과 기능성을 동시에 확보할 수 있습니다. 프론트엔드 개발자가 백엔드 구성에 쉽게 접근할 수 있도록 도와주는 Supabase를 선택했습니다.</p>
</div>

### 스타일링

<div>
  <h4>
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white">
  </h4>
  <p>Tailwind CSS는 추가적인 CSS 파일 없이도 유지보수가 용이하며, 직관적인 클래스 네이밍으로 빠른 스타일링을 지원합니다. 조건부 스타일링이 쉽고, Next.js와의 호환성도 뛰어나기 때문에 효율적인 개발을 위해 선택했습니다.</p>
</div>

### 협업 도구

<div>
  <h4>
    <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white">
  </h4>
  <p>GitHub는 분산된 팀 환경에서 효율적인 버전 관리와 협업을 가능하게 합니다. CI/CD 통합, 오픈소스 생태계, 코드 리뷰 및 이슈 관리 기능을 통해 개발 워크플로우를 최적화하고 있습니다.</p>
</div>
<div>
  <h4>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white">
  </h4>
  <p>Figma는 실시간 협업과 디자인 시스템 관리를 지원하는 강력한 UI/UX 도구입니다. 클라우드 기반으로 언제 어디서나 접근이 가능하며, 디자이너와 개발자 간 원활한 협업을 도와 디자인 프로세스를 최적화합니다.</p>
</div>
<div>
  <h4>
    <img src="https://img.shields.io/badge/Excalidraw-000000?style=flat-square&logo=Excalidraw&logoColor=white">
  </h4>
  <p>Excalidraw는 손으로 그린 듯한 직관적인 다이어그램 작성 도구로, 실시간 협업 기능을 통해 아이디어를 빠르게 시각화하고 공유할 수 있습니다. 오픈소스이기 때문에 자유롭게 사용하고 확장할 수 있습니다.</p>
</div>
<div>
  <h4>
    <img src="https://img.shields.io/badge/jira-%230A0FFF.svg?style=flat-square&for-the-badge&logo=jira&logoColor=white">
  </h4>
  <p>프로젝트의 일정 관리와 우선순위 설정을 체계적으로 관리하기 위해 사용했습니다.
Jira를 통해 각 팀원의 작업 진행 상황을 투명하게 공유하고, 이슈 추적을 통해 프로젝트 목표를 명확히 설정하여 효율적인 일정 관리가 가능했습니다. 특히 QA 과정에서 발견된 버그를 개발팀과 즉시 공유하고, 각 이슈의 해결 상태를 추적함으로써 QA와 개발 간의 긴밀한 협업이 이루어지도록 했습니다.</p>
</div>

### 개발 언어

<div>
  <h4>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">
  </h4>
  <p>TypeScript는 타입 지정으로 인해 코드의 안정성을 높여주고, 런타임 오류를 줄여줍니다. 자동완성 기능과 타입 기반 검증 덕분에 협업 시 개발 생산성을 크게 향상시킵니다. 코드의 안전성과 유지보수성 측면에서 TypeScript를 선택했습니다.</p>
</div>

### 배포 서비스

<div>
  <h4>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white">
  </h4>
  <p>Vercel은 빠르고 간편한 배포를 지원하며, 서버리스 환경에서 자동으로 스케일링되어 성능이 우수합니다. Next.js와의 완벽한 통합을 통해 최신 웹 애플리케이션을 손쉽게 개발, 배포, 최적화할 수 있어 개발자 경험을 극대화합니다.</p>
</div>

<details>
  <summary><h3 id="structure">📦프로젝트 구조</h3></summary>

```
gather_here                                                        //
├─ .eslintrc.json                                                  //
├─ .gitignore                                                      //
├─ .nvmrc                                                          //
├─ .prettierrc                                                     //
├─ LICENSE                                                         //
├─ next.config.mjs                                                 //
├─ package-lock.json                                               //
├─ package.json                                                    //
├─ postcss.config.mjs                                              //
├─ public                                                          //
│  ├─ assets                                                       //
│  │  ├─ gif                                                       //
│  │  ├─ header                                                    //                                      //
│  │  ├─ mypage                                                    //                                               //
│  ├─ Calender                                                     //                                              //
│  ├─ Chat                                                         //
│  ├─ Common                                                       //
│  │  └─ Icons                                                     //
│  ├─ Detail                                                       //
│  ├─ Favicon                                                      //
│  ├─ Link                                                         //
│  ├─ logos                                                        //
│  ├─ Main                                                         //
│  │  ├─ AD                                                        //
│  │  ├─ PrCard                                                    //
│  ├─ MyPage                                                       //
│  ├─ Post                                                         //
│  │  └─ .gitkeep                                                  //
│  └─ Stacks                                                       //
├─ README.md                                                       //
├─ src                                                             //
│  ├─ app                                                          //
│  │  ├─ (auth)                                                    //
│  │  │  ├─ login                                                  //
│  │  │  │  └─ page.tsx                                            //
│  │  │  └─ signup                                                 //
│  │  │     └─ page.tsx                                            //
│  │  ├─ (mainpage)                                                //
│  │  │  ├─ all                                                    //
│  │  │  │  └─ page.tsx                                            //
│  │  │  ├─ events                                                 //
│  │  │  │  └─ page.tsx                                            //
│  │  │  ├─ layout.tsx                                             //
│  │  │  ├─ projects                                               //
│  │  │  │  └─ page.tsx                                            //
│  │  │  └─ studies                                                //
│  │  │     └─ page.tsx                                            //
│  │  ├─ api                                                       //
│  │  │  ├─ auth                                                   //
│  │  │  │  └─ callback                                            //
│  │  │  │     └─ route.ts                                         //
│  │  │  ├─ events                                                 //
│  │  │  │  └─ route.ts                                            //
│  │  │  └─ gatherHub                                              //
│  │  │     └─ route.ts                                            //
│  │  ├─ eventsdetail                                              //
│  │  │  ├─ not-found.tsx                                          //
│  │  │  └─ [id]                                                   //
│  │  │     ├─ layout.tsx                                          //
│  │  │     ├─ modaltest                                           //
│  │  │     │  └─ page.tsx                                         //
│  │  │     └─ page.tsx                                            //
│  │  ├─ gatherHub                                                 //
│  │  │  ├─ layout.tsx                                             //
│  │  │  └─ page.tsx                                               //
│  │  ├─ globals.css                                               //
│  │  ├─ layout.tsx                                                //
│  │  ├─ maindetail                                                //
│  │  │  ├─ not-found.tsx                                          //
│  │  │  └─ [id]                                                   //
│  │  │     └─ page.tsx                                            //
│  │  ├─ mypage                                                    //
│  │  │  ├─ hubprofile                                             //
│  │  │  │  └─ page.tsx                                            //
│  │  │  ├─ layout.tsx                                             //
│  │  │  ├─ myinterests                                            //
│  │  │  │  └─ page.tsx                                            //
│  │  │  ├─ mypeople                                               //
│  │  │  │  └─ page.tsx                                            //
│  │  │  ├─ myposts                                                //
│  │  │  │  └─ page.tsx                                            //
│  │  │  └─ page.tsx                                               //
│  │  ├─ not-found.tsx                                             //
│  │  ├─ page.tsx                                                  //
│  │  ├─ post                                                      //
│  │  │  ├─ (edit)                                                 //
│  │  │  │  └─ [id]                                                //
│  │  │  │     └─ page.tsx                                         //
│  │  │  └─ page.tsx                                               //
│  │  ├─ privacy-policy                                            //
│  │  │  └─ page.tsx                                               //
│  │  └─ terms-of-service                                          //
│  │     └─ page.tsx                                               //
│  ├─ assets                                                       //
│  │  ├─ loadingBar.json                                           //
│  │  └─ loadingSpinner.json                                       //
│  ├─ components                                                   //
│  │  ├─ Common                                                    //
│  │  │  ├─ Card                                                   //
│  │  │  │  └─ PostCard                                            //
│  │  │  │     ├─ ItEventCardLong.tsx                              //
│  │  │  │     ├─ ItEventCardShort.tsx                             //
│  │  │  │     ├─ PostCardLong.tsx                                 //
│  │  │  │     └─ PostCardShort.tsx                                //
│  │  │  ├─ Header                                                 //
│  │  │  │  └─ Header.tsx                                          //
│  │  │  ├─ Loading                                                //
│  │  │  │  ├─ InitialLoadingWrapper.tsx                           //
│  │  │  │  ├─ InitialLoadingWrapperLottie.tsx                     //
│  │  │  │  ├─ LottieAnimation.tsx                                 //
│  │  │  │  └─ PuzzleAnimation.tsx                                 //
│  │  │  ├─ Modal                                                  //
│  │  │  │  └─ CommonModal.tsx                                     //
│  │  │  ├─ PageTitle                                              //
│  │  │  │  └─ empty.ts                                            //
│  │  │  ├─ Skeleton                                               //
│  │  │  │  ├─ CalenderLoader.tsx                                  //
│  │  │  │  ├─ CarouselLoader.tsx                                  //
│  │  │  │  ├─ LeftNavLoader.tsx                                   //
│  │  │  │  ├─ MypageList.tsx                                      //
│  │  │  │  ├─ MypageProfileInfo.tsx                               //
│  │  │  │  ├─ MypageProfilePicture.tsx                            //
│  │  │  │  └─ ProfileLoader.tsx                                   //
│  │  │  └─ Toast                                                  //
│  │  │     └─ Toast.tsx                                           //
│  │  ├─ EventsDetail                                              //
│  │  │  └─ ITLikeButton.tsx                                       //
│  │  ├─ GatherHub                                                 //
│  │  │  ├─ JobDirectory.tsx                                       //
│  │  │  └─ MemberCard.tsx                                         //
│  │  ├─ Layout                                                    //
│  │  │  └─ MainLayout.tsx                                         //
│  │  ├─ Login                                                     //
│  │  │  ├─ LoginForm.tsx                                          //
│  │  │  └─ OAuthButtons.tsx                                       //
│  │  ├─ MainDetail                                                //
│  │  │  ├─ custom-quill.css                                       //
│  │  │  ├─ FormDropdown.tsx                                       //
│  │  │  ├─ FormInput.tsx                                          //
│  │  │  ├─ FormMultiSelect.tsx                                    //
│  │  │  ├─ LikeButton.tsx                                         //
│  │  │  ├─ ReactQuillEditor.tsx                                   //
│  │  │  └─ ShareButton.tsx                                        //
│  │  ├─ MainPage                                                  //
│  │  │  ├─ AdCard                                                 //
│  │  │  │  └─ AdCard.tsx                                          //
│  │  │  ├─ Carousel                                               //
│  │  │  │  ├─ Carousel.css                                        //
│  │  │  │  ├─ Carousel.tsx                                        //
│  │  │  │  └─ EventsCarousel.tsx                                  //
│  │  │  ├─ FilterBar                                              //
│  │  │  │  ├─ EventFilterBar.tsx                                  //
│  │  │  │  └─ FilterBar.tsx                                       //
│  │  │  ├─ InfiniteScroll                                         //
│  │  │  │  ├─ EventsInfiniteScroll.tsx                            //
│  │  │  │  └─ InfiniteScrollComponents.tsx                        //
│  │  │  ├─ MainSideBar                                            //
│  │  │  │  ├─ Calender                                            //
│  │  │  │  │  ├─ Calender.tsx                                     //
│  │  │  │  │  └─ fullcalender.css                                 //
│  │  │  │  ├─ Chat                                                //
│  │  │  │  │  ├─ Chat.tsx                                         //
│  │  │  │  │  └─ ChatModal.tsx                                    //
│  │  │  │  ├─ Footer                                              //
│  │  │  │  │  ├─ Footer.css                                       //
│  │  │  │  │  └─ Footer.tsx                                       //
│  │  │  │  ├─ MainSideBar.tsx                                     //
│  │  │  │  └─ PrCard                                              //
│  │  │  │     └─ PrCard.tsx                                       //
│  │  │  ├─ NavTab                                                 //
│  │  │  │  └─ NavTabs.tsx                                         //
│  │  │  └─ PageContent                                            //
│  │  │     ├─ AllContent.tsx                                      //
│  │  │     ├─ EventsContent.tsx                                   //
│  │  │     ├─ ProjectContent.tsx                                  //
│  │  │     └─ StudiesContent.tsx                                  //
│  │  ├─ MyPage                                                    //
│  │  │  ├─ Common                                                 //
│  │  │  │  ├─ LeftNav.tsx                                         //
│  │  │  │  └─ Pagination.tsx                                      //
│  │  │  ├─ HubInfo                                                //
│  │  │  │  ├─ BackgroundPicture.tsx                               //
│  │  │  │  ├─ HubProfileInfo.tsx                                  //
│  │  │  │  ├─ Introductioin.tsx                                   //
│  │  │  │  ├─ TeamQuestions.tsx                                   //
│  │  │  │  └─ TechStack.tsx                                       //
│  │  │  ├─ MyInfo                                                 //
│  │  │  │  ├─ ProfileInfo.tsx                                     //
│  │  │  │  └─ ProfilePicture.tsx                                  //
│  │  │  ├─ MyInterests                                            //
│  │  │  │  └─ InterestsTap.tsx                                    //
│  │  │  └─ MyPosts                                                //
│  │  │     └─ PostsTap.tsx                                        //
│  │  ├─ Post                                                      //
│  │  │  └─ PostForm.ts                                            //
│  │  └─ Signup                                                    //
│  │     ├─ components                                             //
│  │     │  ├─ AlertModal.tsx                                      //
│  │     │  ├─ ExperienceLevelButton.tsx                           //
│  │     │  ├─ JobSelectionButton.tsx                              //
│  │     │  ├─ NicknameInput.tsx                                   //
│  │     │  └─ SkipButton.tsx                                      //
│  │     ├─ Signup01.tsx                                           //
│  │     ├─ Signup02.tsx                                           //
│  │     ├─ Signup03.tsx                                           //
│  │     ├─ Signup04.tsx                                           //
│  │     └─ SigupForm.tsx                                          //
│  ├─ fonts                                                        //
│  │  └─ PretendardVariable.woff2                                  //
│  ├─ hooks                                                        //
│  │  ├─ useChat.ts                                                //
│  │  ├─ useCheckNickname.ts                                       //
│  │  ├─ useDraft.ts                                               //
│  │  ├─ useInfiniteScroll.ts                                      //
│  │  ├─ useSearch.ts                                              //
│  │  ├─ useSelectJob.ts                                           //
│  │  └─ useSubmitProfile.ts                                       //
│  ├─ lib                                                          //
│  │  ├─ fetchPosts.ts                                             //
│  │  └─ validation.ts                                             //
│  ├─ middleware.ts                                                //
│  ├─ provider                                                     //
│  │  ├─ CombinedProviders.tsx                                     //
│  │  ├─ ContextProvider.tsx                                       //
│  │  ├─ Provider.tsx                                              //
│  │  ├─ QueryClientProvider.tsx                                   //
│  │  └─ UserContextProvider.tsx                                   //
│  ├─ types                                                        //
│  │  ├─ chats                                                     //
│  │  │  └─ Chats.type.ts                                          //
│  │  ├─ posts                                                     //
│  │  │  └─ Post.type.ts                                           //
│  │  ├─ supabase.ts                                               //
│  │  └─ users                                                     //
│  │     └─ Users.type.ts                                          //
│  └─ utils                                                        //
│     └─ supabase                                                  //
├─ supabase                                                        //
│  ├─ .gitignore                                                   //
│  ├─ config.toml                                                  //
│  └─ seed.sql                                                     //
├─ tailwind.config.ts                                              //
└─ tsconfig.json                                                   //

```

</details>

## <h3 id="ui"> 6. 🎨 UI </h3>

#### 시작하기, 메인페이지 게시물 리스트

<img src="https://github.com/user-attachments/assets/5e8e84d3-78c0-48ff-8454-81a74ddd4676" alt="프로젝트 결과 1" width="800px" />

#### IT 행사, 메인페이지 채팅, PR 섹션

<img src="https://github.com/user-attachments/assets/620a8201-9925-4c98-a5b6-932515e7f033" alt="프로젝트 결과 2" width="800px" />
<img src="https://github.com/user-attachments/assets/741e7b75-032a-4a63-9787-3bb823fd1c41" alt="프로젝트 결과 3" width="800px" />

#### 마이페이지

<img src="https://github.com/user-attachments/assets/f45c4fb7-1333-4d0c-be3d-1d3d2c2c0131" alt="프로젝트 결과 4" width="800px" />

## <span id="troubleshooting"> 7.🔨 트러블 슈팅</span>

### react-select로 다중 선택을 구현하며 server와 client의 id가 다른 이슈

#### 이슈 발생

- **경고: Warning: Prop `id` did not match. Server: "react-select-2-live-region" Client: "react-select-3-live-region"**
  <img src="https://github.com/user-attachments/assets/9a7f652b-a51b-4ab0-87c3-3e291ffa5a8f" alt="image" width="600px" />

#### 해결책

- const Select = dynamic(() => import("react-select"), { ssr: false });으로 클라이언트측에서 랜더링 될 수 있게 동적으로 import
- Select 컴포넌트에 instanceId={uuid}를 설정. instanceId prop을 추가하여 해결하였습니다.

### 로그인 후 signupForm에서 DB에 정보저장 없이 탈출하면 생기는 이슈

#### 이슈 발생

- 기존의 플로우는 소셜로그인 이후에 signup페이지로 이동하고 signupForm안에서 받은 정보를 받아서 프로필 저장을 해야지만 Users테이블로 정보가 저장되고 메인페이지로 넘어가서부터 유저의 사이트 활동이 가능해지는 방식이었다.

- 이 플로우의 문제점은 추가적인 정보를 유저에게 받는 과정에서 유저가 뒤로가기를 하거나 url을 변경해서 다른 페이지로 이동하려고 하거나, 탭을 종료하고 다시 사이트에 들어온 후에 소셜로그인 자체는 되어있지만 Users테이블에는 정보가 하나도 남아있지 않다는 것이었다.

#### 해결책

- 가장 중요했던 포인트는 유저의 정보를 DB에 넣는 시점이었던 것을 깨닫고
  유저가 로그인을 하고 Signup페이지로 넘어가기 직전에 Default Data를 insert하는 것이 포인트였다.
- 그리고 기존에 프로필 저장하기를 클릭했을때 insert 하던 것은 update만 가능하게 만들었다.
- 그렇게되면 유저는 로그인을하고 자연스럽게 Default Data를 가진 상태로 Signup페이지로 이동하게 될 것이고
  signupForm을 어떤 방식으로 탈출하더라도 메인페이지의 모든 기능을 다 사용할 수 있는 것이었다.
  필요하다면 유저는 언제든지 마이페이지에 가서 자신의 정보를 update 할 수 있는 구조가 된다.

### Next.js 배포 후 발생한 hydration 오류

#### 이슈 발생

- 페이지 배포 후 콘솔 창에서 다음과 같은 오류가 계속해서 발생함.
  <img src="https://github.com/user-attachments/assets/0303026c-c905-44a5-b9b4-a95d5c689ace" alt="image" width="400px" />

#### 해결책

- 서버 컴포넌트에서 Date.now()를 사용하던 부분이 있었는데, 클라이언트가 페이지를 렌더링할 때 서버에서 전달된 HTML의 값과 브라우저에서 렌더링 시점의 값이 달라 오류가 발생했습니다.

```javascript
const ItEventCardLong: NextPage<EventsCardProps> = ({ post }) => {
  const deadlineDate = new Date(post.date_done);
  const daysLeft = Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const displayDaysLeft = daysLeft === 0 ? "D-day" : `D-${daysLeft}`;

  return (
    <ul className="flex items-center">
      <li>
        <span className="label-secondary rounded-full text-baseS  px-3 py-1.5 mr-1">{displayDaysLeft}</span>
      </li>
      <li className="text-baseS  text-labelNormal ml-2">
        <time dateTime="YYYY-MM-DD">{dayjs(post.date_start).format("YYYY-MM-DD")}</time>
      </li>
    </ul>
  );
};
```

- 위 코드에서 서버에서 문서를 생성할 때 사용된 Date.now() 값과 브라우저에서 렌더링 시 사용하는 값이 달라지면서, 이로 인해 최종적으로 새로고침이 한 번 더 발생하는 문제가 있었습니다.

```javascript
const ItEventCardShort: NextPage<EventsCardProps> = ({ post }) => {
  const { user: currentUser } = useUser();
  const [isClient, setIsClient] = useState<boolean>(false);
  const today = dayjs();
  const deadlineDate = dayjs(post.date_done);
  // const daysLeft = Math.ceil((deadlineDate.unix() - now.unix()) / (1000 * 60 * 60 * 24));
  const daysLeft = today.diff(deadlineDate, "d", true);
  const displayDaysLeft =
    daysLeft === 0 ? "D-day" : daysLeft < 0 ? `D${daysLeft.toFixed(0)}` : `D+${Math.ceil(daysLeft)}`;

  useEffect(() => {
    setIsClient(true);

    return () => {
      setIsClient(false);
    };
  }, []);

  return (
    {isClient ? (
        <ul className="flex justify-between items-center">
        <li>
            <span className="label-secondary rounded-full text-baseS px-3 py-1.5">{displayDaysLeft}</span>
        </li>
        <li>
            <time dateTime={post.date_done} className="text-baseS text-labelNormal">
            {dayjs(post.date_done).format("YYYY-MM-DD")}
            </time>
        </li>

        <LikeButton eventId={post.event_id} currentUser={currentUser} />
        </ul>
) : null})
}
```

- `Date.now()` 값을 사용하는 부분이 컴포넌트가 마운트된 후에 렌더링되도록 useEffect()를 사용하여, 컴포넌트가 정상적으로 마운트된 이후에 날짜가 렌더링되도록 구현했습니다.

<!-- <details>
<summary>버전 1.0</summary>

- 프로젝트 기간 : 2024.7.16 ~ 2024.8.20

**🏆 우수상 수상 - [내일배움캠프 React 5기] (2024)** <br>

<img src="https://github.com/user-attachments/assets/db3839e3-019b-4010-8901-ac503f7bce19" alt="Group 4" width="600px" />

<br>

<p>안녕하세요! 5명의 프론트엔드 개발자와 1명의 디자이너로 구성된 <strong>게더 히어</strong>팀입니다.<br>
`게더 히어`는 각기 다른 역량을 가진 우리가 모여, 협업의 시너지를 극대화 시킨다 라는 의미를 가지고 있습니다. <br>
 항상 새로운 가능성을 발견하는 팀입니다! 🤲🔥<br>
</p>

|                                                            👑김영범                                                            |                                                             💻조은영                                                              |                                                                   🔎이하름                                                                   |                                                                   💡김성준                                                                   |                                                                   🪄이보아                                                                    |                                                              🎨전정현                                                              |
| :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|            <img src="https://github.com/user-attachments/assets/8720fef6-8ab1-4350-b9a4-068548e70e1e" width="200">             |              <img src="https://github.com/user-attachments/assets/b5f761ab-9343-4726-9a70-32e0745567dc" width="200">              |                   <img src="https://github.com/user-attachments/assets/5a108b91-7992-428e-a8a9-ceb78284685f" width="200">                    |                   <img src="https://github.com/user-attachments/assets/819e65bc-ca66-4dcd-870d-80b6a4c3dbb2" width="200">                    |                    <img src="https://github.com/user-attachments/assets/b0aaa5a1-4e9c-4a6e-8ccb-615b22e6fbd1" width="200">                    |              <img src="https://github.com/user-attachments/assets/f394d0c9-314a-441e-8683-7f35e12f49f2" width="200">               |
| ![Team%20Leader](https://img.shields.io/badge/-Team%20leader-yellow) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Deputy%20Leader](https://img.shields.io/badge/-Deputy%20Leader-green) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Development%20Leader](https://img.shields.io/badge/-Development%20leader-orange) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![WorkManagement](https://img.shields.io/badge/-Work%20Management%20leader-f67280) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Communication%20Leader](https://img.shields.io/badge/-Comunication%20Leader-mint) ![FrontEnd](https://img.shields.io/badge/FrontEnd-3f97fb) | ![Design%20Leader](https://img.shields.io/badge/-Design%20leader-purple) ![Designer](https://img.shields.io/badge/Designer-004088) |
|                                 오픈채팅 <br> 캘린더<br>(행사 일정) <br> IT 행사 <br> 검색기능                                 |                                           글작성 페이지 <br> 디테일 페이지 <br> 북마크                                            |                                              메인 페이지 <br> 슬라이드 <br> 디자인 QA <br>적용                                               |                                                        소셜 로그인 <br> 로그인 설문폼                                                        |                                   마이페이지 <br> 반응형 해더 <br> 공통 컴포넌트 <br> 디자인관련 <br> 소통                                    |                                     웹 디자인 <br> 모바일 디자인 <br> 컴포넌트 <br> 로고 제작                                      |
|                                         github:<br> [kubap](https://github.com/kybaq)                                          |                                      github:<br> [Eunyoung](https://github.com/Eunyoung-Jo)                                       |                                              github:<br> [Hareum](https://github.com/LeeHareum)                                              |                                          github:<br> [SungJoon](https://github.com/ilovezerocokeya)                                          |                                               github:<br> [Boa](https://github.com/leeboa2005)                                                |                                     blog:<br> [Junghyun](https://velog.io/@yardvvorker/posts)                                      |

</details> -->
