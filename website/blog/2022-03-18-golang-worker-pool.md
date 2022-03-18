---
slug: go-worker-pool
title: Golang Worker pool
authors: thanhpp
tags: [golang]
---

```go
package main

import (
	"context"
	"sync"
	"time"
)

type Work struct {
	Name string
	Exec func() error
}

type WorkerPool struct {
	ctx        context.Context
	workerNum  int
	maxRetries int
	retryWait  time.Duration
	workC      chan *Work
	wG         *sync.WaitGroup
}

func NewWorkerPool(
	ctx context.Context,
	workerNum, maxRetries int,
	retryWait time.Duration,
) *WorkerPool {
	wp := &WorkerPool{
		ctx:        ctx,
		workerNum:  workerNum,
		maxRetries: maxRetries,
		retryWait:  retryWait,
		workC:      make(chan *Work),
		wG:         new(sync.WaitGroup),
	}

	wp.spawn()

	return wp
}

func (p *WorkerPool) spawn() {
	for i := 0; i < p.workerNum; i++ {
		go p.workerFn()
	}
}

func (p *WorkerPool) Wait() {
	p.wG.Wait()
}

func (p *WorkerPool) AddWork(name string, exec func() error) {
	p.wG.Add(1)
	p.workC <- &Work{
		Name: name,
		Exec: exec,
	}
}

func (p *WorkerPool) workerFn() {
	for {
		select {
		case <-p.ctx.Done():
			return

		case w := <-p.workC:
			if w == nil {
				continue
			}

			func() {
				defer p.wG.Done()

				var err error
				logger.Infof("START: %s", w.Name)

				for i := 0; i <= p.maxRetries; i++ {
					err = w.Exec()
					if err == nil {
						logger.Infof("SUCCESS: %s", w.Name)
						return
					}
				}

				logger.Errorf("ERROR: %s.After: %d retries. Err: %v",
					w.Name, p.maxRetries, err)
			}()
		}
	}
}

```
