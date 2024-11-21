# Moradio 데스크톱 앱

> [!Important]
> 웹 버전 Moradio 프로젝트가 Moradio 데스크톱 앱 프로젝트로 변경되었습니다. 자세한 내용은 [아래 문단](https://github.com/jihun-io/Moradio-Desktop?tab=readme-ov-file#5-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EC%95%B1%EC%9D%84-%EC%A0%9C%EC%9E%91%ED%95%98%EA%B2%8C-%EB%90%9C-%EA%B3%84%EA%B8%B0)에서 확인할 수 있습니다.

![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=for-the-badge&logo=CloudflareWorkers&logoColor=white)

![Moradio Electron 데스크톱 앱 스크린샷](https://github.com/user-attachments/assets/03f4bc4b-758f-468b-a10f-d676d5505d56)

> 모두 모아둔 모두의 라디오
>
> 
**다운로드:** [https://github.com/jihun-io/Moradio-Desktop/releases](https://github.com/jihun-io/Moradio-Desktop/releases)

## 프로젝트 소개

📻 라디오, 좋아하세요?

대한민국의 지상파 3사 및 기타 방송국들의 라디오 스트리밍 URL을 수신할 수 있는 Electron 기반의 데스크톱 애플리케이션입니다. 라디오를 듣기 위해 각 방송사의 라디오 애플리케이션을 설치해야 하는 불편함을 해결하고자 하는 목적으로 개발되었습니다.

## 2. 사용된 기술

- Electron
- React
- TypeScript
- Tailwind CSS
- Cloudflare Workers
- Cloudflare Pages

## 3. 주요 기능

- 전국 지상파 3사 및 기타 방송국의 라디오 스트리밍 URL을 재생할 수 있습니다.
- 최근 재생한 방송국 목록이 저장됩니다.
- 다크 모드를 지원합니다.

## 4. 지원하는 디바이스
- Windows (x64)
- macOS (Apple silicon, x64)

## 5. 데스크톱 앱을 제작하게 된 계기

처음에는 데스크톱 사용자를 위해 웹 애플리케이션으로 제작되었고, 며칠 간 인터넷 상에 배포를 하기도 했습니다. 그러나 일부 방송국의 스트리밍이 재생되지 않는 이슈가 존재했습니다. 원인을 분석해 보니, 암호화되지 않은 HTTP로 URL을 제공하는 방송국의 스트리밍이 HTTPS로 동작하는 프론트엔드 상에서는 Mixed Content 이슈로 동작하지 않는다는 점을 확인할 수 있었습니다.

문제를 해결하기 위해 프록시 서버를 둘까 하는 생각도 했지만, 그럴 경우 방송사의 저작물을 직접 재전송하게 되어 저작권법에 위배될 우려가 있다고 판단했습니다. 그렇기 때문에 HTTP로 제공되는 스트리밍 URL을 로컬에서 직접 수신할 수 있는 데스크톱 앱을 개발하게 되었습니다.

Electron 프레임워크를 선택한 이유는 기존에 개발한 웹 버전 Moradio의 코드를 재활용하고 싶었기 때문입니다. 기존의 웹 버전 Moradio가 React 기반의 Next.js 프레임워크로 개발되었기에 Electron 앱으로 포팅하기 쉬울 것이라고 판단했고, 실제로도 포팅 과정이 매우 용이했습니다.

## 6. 도움을 주신 분

각 방송사의 라디오 스트리밍 URL을 정리해 주신 [**블루스크린 (BSofDeath)**](https://github.com/BSofDeath)님께 진심으로 감사드립니다. 블루스크린님의 프로젝트 덕분에 Moradio를 개발할 수 있었습니다.

- 참고한 블로그 게시글은 다음과 같습니다: https://blog.bsod.kr/137
- 참고한 GitHub 리포지토리는 다음과 같습니다: https://github.com/BSofDeath/radio.bsod.kr

## 7. 방송사 목록

- KBS
  - KBS 1라디오
  - KBS 2라디오
  - KBS 3라디오
  - KBS 1FM
  - KBS 2FM
  - KBS 한민족방송
- MBC

  - MBC 표준FM
  - MBC FM4U

- SBS

  - SBS 러브FM
  - SBS 파워FM

- EBS

  - EBS FM

- 지역방송

  - OBS 라디오
  - 경인방송

- YTN

  - YTN 라디오

- TBS

  - TBS eFM
  - TBS FM

- TBN

  - TBN 교통방송

- CBS

  - CBS 음악FM
  - CBS 표준FM
  - CBS JOY4U

- 종교방송

  - FEBC 극동방송
  - BBS 불교방송
  - CPBC 가톨릭평화방송
  - WBS 원음방송

- 특수방송
  - 국방FM
  - 국악방송
 
## 8. 향후 계획

- [ ] 업데이트 확인 기능
- [ ] Windows 앱 서명
- [ ] 즐겨찾기 기능 추가
- [ ] 방송국 검색 기능 추가

## 9. 참고 사항

- Moradio는 각 방송사의 공개된 라디오 스트리밍 URL을 접속자의 디바이스로 중개하는 애플리케이션이며, Moradio는 방송을 절대 녹취하거나 재송신하지 않습니다.

- 라디오 방송의 저작권은 각 방송사에게 있습니다.
