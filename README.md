# 🎓 Causal Inference 학습 가이드

인과추론(Causal Inference)을 입문부터 고급까지 체계적으로 학습할 수 있는 **Interactive 웹 기반 학습 플랫폼**입니다.

## 📚 프로젝트 개요

이 프로젝트는 데이터 과학자, 연구자, 학생들이 인과추론의 개념과 방법론을 효과적으로 학습할 수 있도록 설계된 포괄적인 교육 자료입니다. 단순한 이론 설명을 넘어 **Interactive 시뮬레이션**, **실시간 시각화**, **퀴즈** 등을 통해 능동적인 학습 경험을 제공합니다.

### ✨ 주요 특징

- **📖 체계적인 커리큘럼**: 입문(5챕터) → 중급(5챕터) → 고급(5챕터)의 15개 챕터
- **🎮 Interactive 학습**: 실시간 시뮬레이션과 데이터 시각화
- **💻 Pure JavaScript**: 별도 설치 없이 웹 브라우저에서 바로 실행
- **📊 시각적 설명**: DAG, 산점도, 히스토그램 등 다양한 시각화
- **✅ 퀴즈 및 평가**: 각 챕터마다 학습 내용 확인 퀴즈
- **📱 반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- **🌐 한국어 지원**: 완전한 한국어 설명과 예시

## 🗺️ 커리큘럼 구조

### 🌱 입문 과정 (Beginner)

1. **인과추론 소개** - 인과추론의 기본 개념과 중요성
2. **상관관계 vs 인과관계** - Simpson's Paradox, 교란 변수
3. **잠재적 결과 프레임워크** - Rubin Causal Model, ITE, ATE
4. **DAG 기초** - 인과 그래프, d-separation, Backdoor Criterion
5. **무작위 대조 실험 (RCT)** - 실험 설계, 통계적 검정력

### 🚀 중급 과정 (Intermediate)

6. **성향 점수 방법** - Propensity Score Matching, IPW, Doubly Robust
7. **매칭 방법** - Exact Matching, Nearest Neighbor, CEM
8. **도구 변수 (IV)** - 2SLS, 약한 도구 문제
9. **회귀 불연속 설계 (RDD)** - Sharp RDD, Fuzzy RDD
10. **이중차분법 (DiD)** - Parallel Trends, Event Study

### 🎯 고급 과정 (Advanced)

11. **합성 통제법** - Synthetic Control, Placebo Tests
12. **매개 분석** - Direct/Indirect Effects, Natural Effects
13. **민감도 분석** - Rosenbaum Bounds, E-values
14. **머신러닝과 인과추론** - Causal Forests, DML, Meta-learners
15. **고급 주제** - Interference, Time-varying Treatments

## 🚀 시작하기

### 방법 1: 로컬에서 실행

```bash
# 레포지토리 클론
git clone https://github.com/your-username/Causal-Inference-Study.git

# 디렉토리 이동
cd Causal-Inference-Study

# 웹 브라우저로 index.html 열기
# 또는 로컬 서버 실행 (Python 3)
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

### 방법 2: 온라인에서 실행

GitHub Pages를 통해 호스팅된 버전에 접속하세요:
**[데모 사이트 링크]** (배포 후 추가 예정)

## 📂 프로젝트 구조

```
Causal-Inference-Study/
├── index.html              # 메인 페이지
├── css/
│   └── style.css          # 전체 스타일시트
├── js/
│   └── main.js            # Interactive 기능 및 시뮬레이션
├── chapters/              # 각 챕터별 HTML 파일
│   ├── 01-introduction.html
│   ├── 02-correlation-vs-causation.html
│   ├── 03-potential-outcomes.html
│   ├── 04-dag-basics.html
│   ├── 05-rct.html
│   ├── 06-propensity-score.html
│   ├── 14-ml-causal.html
│   └── ...
├── assets/                # 이미지 등 자산 파일
└── README.md              # 프로젝트 설명서
```

## 🎯 학습 방법

### 1. 순차적 학습 (권장)
입문 → 중급 → 고급 순서로 챕터를 학습하세요. 각 챕터는 이전 내용을 기반으로 합니다.

### 2. 주제별 학습
특정 주제에 관심이 있다면 해당 챕터로 바로 이동할 수 있습니다.

### 3. 실습 중심
- 각 챕터의 Interactive 데모를 직접 조작해보세요
- 파라미터를 변경하며 결과가 어떻게 바뀌는지 관찰하세요
- 퀴즈를 풀어 학습 내용을 확인하세요

### 4. 진행률 추적
- 각 챕터 완료 시 "완료하기" 버튼을 클릭하세요
- 메인 페이지에서 전체 학습 진행률을 확인할 수 있습니다

## 💡 주요 Interactive 기능

### 시뮬레이션 예시

1. **상관관계 vs 인과관계 시뮬레이션**
   - 교란 변수의 영향을 실시간으로 확인
   - 상관계수와 인과 효과의 차이 체험

2. **Simpson's Paradox 데모**
   - 전체 데이터와 부분 그룹의 패턴 역전 현상 시각화
   - 실제 사례(UC Berkeley 입학) 탐색

3. **잠재적 결과 시뮬레이션**
   - 개별 처치 효과(ITE)의 분포 확인
   - 평균 처치 효과(ATE) 추정

4. **Collider Bias 체험**
   - Collider를 통제했을 때 발생하는 편향 확인
   - 재능-노력-성공 사례 시뮬레이션

5. **RCT vs 관찰 연구**
   - 무작위 배정의 효과 비교
   - 선택 편향 시각화

6. **성향 점수 매칭**
   - 매칭 전후 공변량 균형 비교
   - IPW 가중치 시각화

7. **CATE 추정**
   - 이질적 처치 효과 탐색
   - 다양한 패턴의 효과 이질성 시각화

## 📖 추천 학습 자료

### 책
- **"The Book of Why"** - Judea Pearl & Dana Mackenzie
- **"Causal Inference: The Mixtape"** - Scott Cunningham
- **"Mostly Harmless Econometrics"** - Joshua Angrist & Jörn-Steffen Pischke
- **"Causal Inference for Statistics, Social, and Biomedical Sciences"** - Guido Imbens & Donald Rubin

### 온라인 강의
- Coursera: "A Crash Course in Causality" (University of Pennsylvania)
- edX: "Causal Diagrams: Draw Your Assumptions Before Your Conclusions" (Harvard)
- YouTube: Brady Neal's Causal Inference Course

### Python 라이브러리
- **DoWhy** (Microsoft) - 인과 추론 파이프라인
- **EconML** (Microsoft) - 경제학적 머신러닝
- **CausalML** (Uber) - 업리프트 모델링
- **PyWhy** - 인과추론 커뮤니티 프로젝트

## 🛠️ 기술 스택

- **HTML5** - 구조
- **CSS3** - 스타일링 및 반응형 디자인
- **Vanilla JavaScript** - Interactive 기능
- **Canvas API** - 데이터 시각화
- **No external dependencies** - 순수 JavaScript로 구현

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 아이디어
- 새로운 챕터 추가
- Interactive 시뮬레이션 개선
- 번역 (영어, 일본어 등)
- 버그 수정
- UI/UX 개선
- 코드 예제 추가 (Python, R 등)

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🙏 감사의 말

이 프로젝트는 다음 연구자들의 업적을 바탕으로 만들어졌습니다:

- **Judea Pearl** - 인과추론의 현대적 프레임워크
- **Donald Rubin** - 잠재적 결과 프레임워크
- **Joshua Angrist & Guido Imbens** - 실증 인과추론 방법론
- **Susan Athey** - 머신러닝과 인과추론의 결합

그리고 전 세계 인과추론 커뮤니티의 모든 연구자와 실무자들에게 감사드립니다.

## 📧 연락처

질문, 제안, 피드백이 있으시면 언제든 연락주세요:

- **Issues**: GitHub Issues를 통해 버그 리포트나 기능 요청
- **Discussions**: GitHub Discussions에서 질문하고 토론하기

## 🌟 Star History

이 프로젝트가 도움이 되었다면 ⭐️ Star를 눌러주세요!

---

**Happy Learning! 🎓📊🚀**

*인과관계를 이해하는 것은 데이터로부터 진정한 통찰을 얻는 첫걸음입니다.*
