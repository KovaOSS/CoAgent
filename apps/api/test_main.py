from fastapi.testclient import TestClient

from main import app


def test_health() -> None:
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_run_lifecycle() -> None:
    client = TestClient(app)

    create = client.post(
        "/runs",
        json={"agent_name": "Lead Research Agent", "goal": "Enrich lead data"},
    )
    assert create.status_code == 200
    run_id = create.json()["id"]

    approve = client.post(f"/runs/{run_id}/approve")
    assert approve.status_code == 200
    assert approve.json()["status"] == "approved"

    complete = client.post(f"/runs/{run_id}/simulate-complete")
    assert complete.status_code == 200
    assert complete.json()["status"] == "completed"

    cancel = client.post(f"/runs/{run_id}/cancel")
    assert cancel.status_code == 409
