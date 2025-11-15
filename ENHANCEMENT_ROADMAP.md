# Causal Inference 학습 플랫폼 고도화 로드맵

## 📊 현황 분석 (2024)

### 전체 구조
- **총 15개 챕터** (입문 5 + 중급 5 + 고급 5)
- **완성도 높은 챕터**: 1, 2, 3, 6, 7, 8, 14 (7개)
- **미완성/스텁 챕터**: 9, 10, 11, 12, 13, 15 (6개)
- **전체 완성도**: 약 60% (내용 기준)

### 강점 요소

#### 1. 뛰어난 시각화 및 인터랙티브 요소
- Chart.js 기반 전문적인 차트
- 실시간 파라미터 조정 시뮬레이션
- Simpson's Paradox 다중 시나리오 시뮬레이터
- DAG 애니메이션 시각화
- 읽기 진행률 추적 시스템

#### 2. 탁월한 교육적 구조
- 직관적 예시 → 수학적 정의 순서
- 실제 사례 연구 포함 (Card & Krueger, UC Berkeley 입학)
- Python/R 코드 예제
- 각 챕터 퀴즈 시스템
- 단계별 난이도 증가

#### 3. 현대적 웹 디자인
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 부드러운 애니메이션
- 그라디언트 기반 UI
- 정보 박스 (노트/경고/팁)

#### 4. 자체 완결형
- 백엔드 불필요
- 순수 JavaScript (외부 의존성 최소)
- 로컬 실행 가능

### 부족한 영역

#### 1. 콘텐츠 완성도 격차 ⚠️
**미완성 챕터 (현재 88-193 라인)**
- Chapter 9: RDD (88 lines) - 기본 구조만 존재
- Chapter 10: DiD (115 lines) - 기본 내용만
- Chapter 11: Synthetic Control (99 lines) - 개념 설명만
- Chapter 12: Mediation Analysis (127 lines) - 스텁
- Chapter 13: Sensitivity Analysis (143 lines) - 스텁
- Chapter 15: Advanced Topics (193 lines) - 개요만

**문제점:**
- 중급/고급 챕터가 짧아 학습 깊이 부족
- 입문 챕터 (900-1300 라인)와 품질 격차 심함
- 인터랙티브 요소 거의 없음

#### 2. 상호작용 요소 편중
- Chapter 1-2: 매우 풍부한 시뮬레이션
- Chapter 3-8: 일부 시뮬레이션
- **Chapter 9-15: 거의 없음** ⚠️

#### 3. 실습 및 실전 요소 부족
- 실제 데이터셋 없음
- 단계별 튜토리얼 부족
- Jupyter Notebook 통합 없음
- 다운로드 가능한 예제 코드 없음

#### 4. 언어 장벽
- 한국어 전용 (국제적 접근성 제한)
- 영어 버전 없음

#### 5. 학습 지원 기능 제한
- 진행 상황 저장 (디바이스 간 동기화 불가)
- 북마크 기능 없음
- 검색 기능 없음
- 노트 작성 기능 없음

#### 6. 평가 시스템 미흡
- 퀴즈만 존재 (실습 문제 없음)
- 즉각적 피드백 제한적
- 난이도별 문제 은행 부족
- 프로젝트 과제 없음

---

## 🎯 우선순위별 고도화 영역

### 🔴 최우선 (High Priority)

#### 1. 미완성 챕터 완성 (Chapter 9-13, 15)
**예상 작업량**: 대 (각 500-1000 라인)

**Chapter 9: RDD (회귀 불연속 설계)**
현재 상태: 기본 개념만 (88 lines)

추가 필요 내용:
- [ ] Sharp RDD vs Fuzzy RDD 상세 설명
- [ ] 실제 시각화
  - Running variable과 outcome 산점도
  - 불연속점 표시
  - 로컬 회귀선 (양쪽)
- [ ] 인터랙티브 시뮬레이션
  - 임계값 조정
  - 대역폭(bandwidth) 조정
  - 처치 효과 크기 조정
  - Sharp vs Fuzzy 비교
- [ ] McCrary 밀도 테스트 시각화
- [ ] 실제 연구 사례 확장
  - Lee et al. (2008) 상세 분석
  - 시각적 재현
- [ ] Python 코드 예제 (rdrobust 라이브러리)
- [ ] R 코드 예제 (rdrobust, rddtools)
- [ ] 실습 문제 (합성 데이터)
- [ ] 연습용 퀴즈 (5-7문제)

**Chapter 10: DiD (이중차분법)**
현재 상태: 기본 구조 (115 lines)

추가 필요 내용:
- [ ] 평행 추세 가정 (Parallel Trends) 상세 설명
- [ ] 시각화
  - 처치군/대조군 트렌드 라인 차트
  - 사전 트렌드 검증
  - 이벤트 스터디 플롯
- [ ] 인터랙티브 시뮬레이션
  - 평행 추세 만족/위배 시나리오
  - 시차 효과(dynamic effects) 시뮬레이션
- [ ] Card & Krueger (1994) 상세 분석
  - 데이터 시각화
  - 결과 재현
- [ ] 최신 방법론
  - Callaway & Sant'Anna (2021)
  - Sun & Abraham (2021)
  - Difference-in-Differences with Multiple Time Periods
- [ ] Staggered Adoption 문제
- [ ] Python 코드 (linearmodels, differences)
- [ ] R 코드 (did, fixest)
- [ ] 실습 예제 (합성 패널 데이터)

**Chapter 11: Synthetic Control Method**
현재 상태: 기본 개념 (99 lines)

추가 필요 내용:
- [ ] 가중치 최적화 과정 시각화
- [ ] 인터랙티브 시뮬레이션
  - 합성 대조군 생성 과정
  - 처치 전후 비교 애니메이션
  - 위약 검정(Placebo tests) 시각화
- [ ] Abadie et al. (2003, 2015) 상세 분석
  - 바스크 지역 사례
  - Proposition 99 (캘리포니아 흡연)
- [ ] 합성 vs 실제 비교 차트
- [ ] In-space/In-time placebo 분포
- [ ] 확장 방법론
  - Augmented Synthetic Control
  - Penalized Synthetic Control
  - Matrix Completion Methods
- [ ] Python 코드 (SyntheticControlMethods)
- [ ] R 코드 (Synth, augsynth)
- [ ] 실습 예제

**Chapter 12: Mediation Analysis (매개 분석)**
현재 상태: 스텁 (127 lines)

추가 필요 내용:
- [ ] 직접 효과 vs 간접 효과 시각화
- [ ] Baron & Kenny 방법
- [ ] 잠재적 결과 기반 매개 분석
  - Natural Direct Effect (NDE)
  - Natural Indirect Effect (NIE)
- [ ] 인터랙티브 DAG
  - X → M → Y 경로 강조
  - X → Y 직접 경로
- [ ] 민감도 분석 (Sequential Ignorability)
- [ ] Causal Mediation 시뮬레이션
- [ ] 실제 사례
  - 교육 프로그램 → 동기 → 성과
  - 광고 → 인지도 → 구매
- [ ] Python 코드 (mediation)
- [ ] R 코드 (mediation, medflex)

**Chapter 13: Sensitivity Analysis (민감도 분석)**
현재 상태: 스텁 (143 lines)

추가 필요 내용:
- [ ] 숨겨진 교란 변수 문제
- [ ] Rosenbaum Bounds
  - Γ (Gamma) 해석
  - 시각화
- [ ] E-value 계산
  - 예제
  - 인터랙티브 계산기
- [ ] Cornfield's Inequality
- [ ] 다양한 가정 시나리오 시뮬레이션
- [ ] 실제 논문에서의 민감도 분석 사례
- [ ] Python 코드 (sensitivity analysis tools)
- [ ] R 코드 (rbounds, sensemakr)

**Chapter 15: Advanced Topics**
현재 상태: 개요 (193 lines)

추가 필요 내용:
- [ ] Interference & Spillover Effects
  - 네트워크 효과
  - 공간적 상관관계
- [ ] Dynamic Treatment Regimes
- [ ] Causal Machine Learning
  - CATE 추정 (Meta-learners)
  - Causal Forests 심화
  - Neural Network 기반 방법
- [ ] 시계열 인과추론
  - Granger Causality
  - Structural VAR
- [ ] 복합 처치 (Multiple Treatments)
- [ ] 최신 연구 동향 (2023-2024)

---

#### 2. 실습 환경 구축
**예상 작업량**: 중

**필요 요소:**
- [ ] **Jupyter Notebook 통합**
  - 각 챕터별 `.ipynb` 파일
  - Google Colab 링크
  - Binder 통합
- [ ] **실제 데이터셋 제공**
  - `data/` 폴더 생성
  - 대표적인 인과추론 데이터셋
    - LaLonde (1986) 직업 훈련
    - Card & Krueger (1994) 최저임금
    - Dehejia & Wahba (1999)
    - 합성 데이터 생성 스크립트
- [ ] **코드 저장소 구조화**
  ```
  /notebooks/
    - 01_introduction.ipynb
    - 02_correlation_vs_causation.ipynb
    - ...
  /data/
    - lalonde.csv
    - card_krueger.csv
    - synthetic_*.csv
  /scripts/
    - data_generators.py
    - simulation_helpers.py
  ```
- [ ] **환경 설정 파일**
  - `requirements.txt` (Python)
  - `environment.yml` (Conda)
  - Docker 이미지

---

#### 3. 인터랙티브 요소 확장
**예상 작업량**: 중-대

**미완성 챕터에 추가할 시뮬레이션:**
- [ ] **RDD 시뮬레이터**
  - 실시간 회귀 불연속 시각화
  - 조작 가능한 매개변수
- [ ] **DiD 시뮬레이터**
  - 평행 추세 검증 도구
  - 이벤트 스터디 플롯
- [ ] **Synthetic Control 시뮬레이터**
  - 가중치 최적화 과정
  - 위약 검정 애니메이션
- [ ] **Mediation 경로 시각화**
  - 직접/간접 효과 분해
- [ ] **Sensitivity Analysis 계산기**
  - E-value 계산
  - Rosenbaum Bounds

**기존 챕터 개선:**
- [ ] Chapter 4 (DAG): 더 복잡한 DAG 편집기
- [ ] Chapter 5 (RCT): A/B 테스트 시뮬레이터
- [ ] Chapter 8 (IV): 2SLS 시각화 개선

---

### 🟡 중간 우선순위 (Medium Priority)

#### 4. 평가 및 피드백 시스템 강화
**예상 작업량**: 중

- [ ] **퀴즈 시스템 확장**
  - 각 챕터당 10-15 문제로 확대
  - 난이도 표시 (쉬움/보통/어려움)
  - 해설 강화
  - 오답 패턴 분석
- [ ] **코딩 챌린지**
  - 브라우저 내 Python 실행 (Pyodide)
  - 자동 채점 시스템
  - 힌트 시스템
- [ ] **프로젝트 과제**
  - 각 섹션별 종합 프로젝트
  - 단계별 가이드
  - 샘플 솔루션
- [ ] **진단 테스트**
  - 사전 평가 (레벨 테스트)
  - 사후 평가 (이해도 점검)

---

#### 5. 학습 경험 개선
**예상 작업량**: 중

- [ ] **검색 기능**
  - 전체 콘텐츠 검색
  - 수식 검색
  - 코드 검색
- [ ] **노트 작성 기능**
  - 챕터별 메모
  - 하이라이트
  - 북마크
  - LocalStorage 또는 클라우드 저장
- [ ] **진행 추적 강화**
  - 시간 추적
  - 학습 통계 대시보드
  - 배지/업적 시스템
- [ ] **소셜 기능**
  - 댓글 (Disqus/Giscus)
  - Q&A 섹션
  - 사용자 기여 (오타 수정 등)

---

#### 6. 콘텐츠 다양화
**예상 작업량**: 대

- [ ] **실제 사례 연구 확장**
  - 의학: RCT, Propensity Score Matching 사례
  - 경제학: 최저임금, 교육 정책
  - 기술: A/B 테스트, 추천 시스템
  - 사회과학: 정책 평가
- [ ] **비디오 콘텐츠**
  - 개념 설명 영상 (YouTube 임베드)
  - 애니메이션 튜토리얼
- [ ] **인터뷰/전문가 의견**
  - 연구자 인터뷰
  - 실무 적용 사례
- [ ] **보충 자료**
  - 수학적 증명 (별도 섹션)
  - 추천 논문 리스트 (주석 포함)
  - 추가 리소스 큐레이션

---

#### 7. 최신 연구 반영
**예상 작업량**: 중-대

- [ ] **2023-2024 최신 논문 추가**
  - NBER, AER, Econometrica
  - ICML, NeurIPS (ML+Causal)
- [ ] **새로운 방법론**
  - Causal Discovery (학습)
  - Reinforcement Learning + Causality
  - Counterfactual Explanations (XAI)
- [ ] **대형 언어 모델 (LLM) & Causality**
  - LLM이 인과추론을 어떻게 사용하는가
  - Causal prompting

---

### 🟢 낮은 우선순위 (Low Priority)

#### 8. 다국어 지원
**예상 작업량**: 대

- [ ] **영어 버전**
  - 모든 콘텐츠 번역
  - 용어 일관성 유지
- [ ] **언어 전환 기능**
  - 드롭다운 메뉴
  - URL 기반 라우팅 (`/ko/`, `/en/`)
- [ ] **기타 언어** (선택적)
  - 중국어, 일본어

---

#### 9. 모바일 앱
**예상 작업량**: 대

- [ ] Progressive Web App (PWA)
- [ ] 오프라인 지원
- [ ] 네이티브 앱 (React Native/Flutter)

---

#### 10. 커뮤니티 플랫폼
**예상 작업량**: 대

- [ ] 포럼/디스커션 보드
- [ ] 사용자 생성 콘텐츠
- [ ] 크라우드소싱 번역
- [ ] GitHub Discussions 활성화

---

## 📋 구체적 개선 제안

### A. 기술적 개선

#### A1. 코드 구조 개선
**현재 문제:**
- `main.js`가 너무 큼 (모든 시뮬레이션 포함)
- 챕터별로 중복 코드 존재

**개선 방안:**
```
/js/
  - core.js (공통 유틸리티)
  - visualizations.js (차트 클래스)
  - simulations/
    - correlation.js
    - potential-outcomes.js
    - dag.js
    - rdd.js
    - did.js
    - synthetic-control.js
  - quiz.js (퀴즈 시스템)
  - progress.js (진행 추적)
```

#### A2. 성능 최적화
- [ ] 이미지 지연 로딩 (Lazy loading)
- [ ] JavaScript 번들 최소화
- [ ] CSS 최적화
- [ ] 서비스 워커 (캐싱)

#### A3. 접근성 (Accessibility)
- [ ] ARIA 레이블
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원
- [ ] 고대비 모드

---

### B. 콘텐츠 개선

#### B1. 수학적 표기 개선
**현재:** HTML 서브스크립트/수퍼스크립트
**개선:** MathJax 또는 KaTeX 통합

예시:
```html
<!-- 현재 -->
<p>τ<sub>i</sub> = Y<sub>i</sub>(1) - Y<sub>i</sub>(0)</p>

<!-- 개선 후 -->
<p>$$\tau_i = Y_i(1) - Y_i(0)$$</p>
```

#### B2. 코드 하이라이팅 강화
- Syntax highlighting (Prism.js / Highlight.js)
- 코드 복사 버튼
- 실행 가능한 코드 블록

#### B3. 참조 문헌 시스템
- 각 챕터 하단에 참고문헌
- BibTeX 스타일 인용
- DOI 링크

---

### C. 교육적 개선

#### C1. 학습 경로 다양화
**현재:** 선형 경로 (1→2→...→15)

**개선:**
```
학습 경로 1: 빠른 시작 (실무자)
  1 → 2 → 6 → 10 → 14

학습 경로 2: 이론 중심 (연구자)
  1 → 3 → 4 → 8 → 12 → 13

학습 경로 3: ML 엔지니어
  1 → 2 → 14 → 7 → 6

학습 경로 4: 완전 학습 (모든 챕터)
  1 → 2 → ... → 15
```

#### C2. 선수 지식 표시
각 챕터에:
- **필수 선수 지식**: "Chapter 3, 4 필수"
- **권장 선수 지식**: "통계학 기초"
- **학습 시간**: "약 45분"

#### C3. 요약 및 치트시트
- 각 챕터 요약 카드
- 다운로드 가능한 PDF 치트시트
- 플래시카드 (Anki 덱)

---

## 🗓️ 단계별 실행 계획

### Phase 1: 콘텐츠 완성 (2-3개월)
**목표:** 모든 챕터를 동일한 품질 수준으로

1. Week 1-2: Chapter 9 (RDD) 완성
2. Week 3-4: Chapter 10 (DiD) 완성
3. Week 5-6: Chapter 11 (Synthetic Control) 완성
4. Week 7-8: Chapter 12 (Mediation) & 13 (Sensitivity) 완성
5. Week 9-10: Chapter 15 (Advanced Topics) 완성
6. Week 11-12: 전체 검토 및 일관성 확보

**산출물:**
- ✅ 15개 완전한 챕터 (각 500-1000 라인)
- ✅ 각 챕터별 인터랙티브 시뮬레이션 최소 1개
- ✅ 실제 사례 연구
- ✅ Python/R 코드 예제
- ✅ 연습 문제 및 퀴즈

---

### Phase 2: 실습 환경 (1-2개월)
**목표:** 실전 학습 가능하도록

1. Week 1-2: Jupyter Notebook 작성
2. Week 3: 데이터셋 수집 및 전처리
3. Week 4: 환경 설정 파일 및 문서화
4. Week 5-6: Google Colab/Binder 통합
5. Week 7-8: 테스트 및 문서화

**산출물:**
- ✅ 15개 Jupyter Notebook
- ✅ 5-10개 실제 데이터셋
- ✅ `requirements.txt`, Docker
- ✅ 실습 가이드 문서

---

### Phase 3: UX 개선 (1-2개월)
**목표:** 학습 경험 최적화

1. Week 1-2: 검색 기능 구현
2. Week 3-4: 노트/북마크 기능
3. Week 5-6: 진행 추적 대시보드
4. Week 7-8: 퀴즈 시스템 확장

**산출물:**
- ✅ 검색 엔진
- ✅ 사용자 노트 시스템
- ✅ 학습 통계 대시보드
- ✅ 확장된 평가 시스템

---

### Phase 4: 콘텐츠 확장 (진행 중)
**목표:** 지속적 개선

- 최신 연구 반영 (분기별)
- 사례 연구 추가 (월별)
- 커뮤니티 피드백 반영
- 비디오 콘텐츠 추가

---

### Phase 5: 국제화 (선택적, 3-6개월)
**목표:** 글로벌 접근성

1. 영어 번역
2. 다국어 인프라
3. 커뮤니티 번역 플랫폼

---

## 📊 성공 지표 (KPIs)

### 콘텐츠 품질
- ✅ 모든 챕터 500+ 라인
- ✅ 각 챕터 최소 1개 인터랙티브 시뮬레이션
- ✅ 각 챕터 최소 5개 퀴즈 문제
- ✅ 각 챕터 실제 사례 연구 포함

### 사용자 경험
- ⏱️ 평균 페이지 로드 시간 < 2초
- 📱 모바일 접근성 점수 > 90
- ♿ WCAG 2.1 AA 준수

### 학습 효과
- 📈 챕터 완료율 목표 > 70%
- 🎯 퀴즈 평균 점수 목표 > 75%
- 💬 사용자 만족도 > 4.5/5

### 커뮤니티
- ⭐ GitHub Stars 목표: 500+
- 🍴 Forks: 100+
- 📝 기여자: 10+

---

## 🔧 기술 스택 개선 제안

### 현재
- HTML5, CSS3, Vanilla JavaScript
- Chart.js
- Canvas API

### 추가 권장
- **MathJax/KaTeX**: 수학 표기 개선
- **Prism.js**: 코드 하이라이팅
- **Lunr.js**: 클라이언트 사이드 검색
- **Pyodide**: 브라우저 내 Python 실행
- **D3.js**: 고급 시각화 (선택적)
- **Three.js**: 3D 시각화 (선택적)

---

## 💡 혁신적 아이디어

### 1. AI 학습 어시스턴트
- ChatGPT/Claude API 통합
- 개념 질문 답변
- 코드 디버깅 도움
- 맞춤형 학습 경로 추천

### 2. 게이미피케이션
- 레벨 시스템
- 배지/업적
- 리더보드
- 데일리 챌린지

### 3. 협업 학습
- 스터디 그룹 기능
- 코드 리뷰 시스템
- 멘토링 매칭

### 4. 적응형 학습 (Adaptive Learning)
- 사용자 수준 진단
- 맞춤형 콘텐츠 추천
- 약점 파악 및 보강

### 5. 실시간 데이터 연동
- 실제 A/B 테스트 데이터 (익명화)
- 정책 효과 실시간 추적
- 뉴스와 연결된 인과 분석

---

## 📚 참고: 벤치마킹 대상

### 유사 플랫폼
1. **Brilliant.org** - 인터랙티브 STEM 학습
2. **Seeing Theory** (Brown Univ.) - 통계 시각화
3. **Distill.pub** - ML 인터랙티브 논문
4. **FastAI** - 실습 중심 ML 과정

### 차별화 포인트
- ✅ 인과추론 전문 플랫폼
- ✅ 한국어 콘텐츠
- ✅ 완전 무료 & 오픈소스
- ✅ 실습 통합 (Jupyter)

---

## 🎓 결론

### 현재 평가
**전체 점수: 7.5/10**
- 콘텐츠 품질 (완성 챕터): 9/10
- 콘텐츠 완성도: 6/10
- 인터랙티브 요소: 8/10
- 실습 환경: 4/10
- 학습 지원: 6/10

### 완성 후 예상 평가
**목표 점수: 9.5/10**
- 콘텐츠 품질: 9.5/10
- 콘텐츠 완성도: 9.5/10
- 인터랙티브 요소: 9/10
- 실습 환경: 9/10
- 학습 지원: 9/10

### 최종 목표
> **"세계 최고의 오픈소스 인과추론 학습 플랫폼"**

완성되면 다음이 가능:
- 📚 대학 강의 보조 자료
- 💼 기업 교육 프로그램
- 🔬 연구자 온보딩
- 🎓 자기주도 학습

---

## 📞 다음 단계

1. **우선순위 확인**: 이 로드맵에서 먼저 작업할 영역 결정
2. **리소스 배정**: 시간, 인력, 기술 스택
3. **마일스톤 설정**: Phase 1부터 순차적으로
4. **커뮤니티 참여**: GitHub Issues, Discussions 활용
5. **지속적 개선**: 사용자 피드백 반영

---

**문서 버전**: 1.0
**작성일**: 2024
**다음 검토**: Phase 1 완료 후
