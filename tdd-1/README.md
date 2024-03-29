## TDD
코드에 대한 자동화 테스트뿐만 아니라 주로 **_테스트 사양_** 에 따라 구현을 추진하는 데 도움이 된다.  

다음은 TDD를 통해 해결하고자 하는 문제 중 **_일부_** 다.
- 프로덕션 코드는 처음에 테스트를 염두에 두지 않고 설계되므로 테스트하기 어려울 수 있다.
- 테스트를 통해 시스템의 일부가 예상대로 동작하는지 확인할 수 없다.  
- 기능 구현을 마친 후 테스트 코드를 작성하는 건 지루할 수 있다. 중복 작업처럼 느껴질 수 있다.
- 결국 현재 구현에 편향되어 테스트 품질에 영향을 미치게 된다.
  
<br>

### 프로덕션 코드 작성 전 항상 실패한 테스트로 코드를 시작해야 한다.
먼저 실패하는 케이스를 작성하고 그 다음 실패 케이스를 통과시키는 코드를 작성한다.  
이러한 개발 접근 방식은 테스트 요구 사항이 충족되는 것을 보장한다.

> TDD 3가지 법칙(Clean coder)
> 1. 실패한 단위(Unit) 테스트를 먼저 작성하기 전까지 프로덕션 코드를 작성할 수 없다.
> 2. 실패하기에 충분한 것보다 더 많은 단위 테스트를 작성하는 건 허용되지 않고 컴파일되지 않는 것은 실패다.
> 3. 현재 실패한 단위 테스트를 통과하기에 충분한 프로덕션 코드를 더 이상 작성할 수 없다.
  
위 3가지 법칙을 따르면 각각 30초 정도의 짧은 주기가 발생한다.  
먼저 예상되는 동작을 설명하는 테스트를 작성한 다음 이 단위 테스트를 통과하도록 클래스 또는 함수를 작성한 후 다음 테스트로 넘어간다.  
선택적으로 테스트 통과 후 코드를 더 깔끔하게 만들기 위해 리팩토링을 할 수 있다.  
  
끈기 있게 규칙을 준수한다면 애플리케이션은 매 주기마다 항상 작동하며 모든 커밋에서 모든 테스트가 통과된다.  
이는 CI(지속적 통합)에 가장 중요한 요소다.
- **Red**: Write a failing test
- **Green**: Make the test pass
- **Blue**: Refactor

<br>

### 은탄환이 아니다
유용하고 효율적이려면 _**적절하게**_ 적용되어야 한다.  
사용자 (클라이언트)의 관점에서 예쌍되는 코드 동작을 설명하는 테스트를 사용하는 게 더 낫다는 걸 명심해야 한다.   
테스트에서 캡슐화될 구현 세부 사항을 처리해야 한다면 이는 위험 신호이다.  

<br>

### 단계에 초점
코드는 테스트 요구 사항에 나타나므로 사전 설계를 수행할 필요가 없다.  

> https://trilon.io/blog/tdd-with-nestjs


