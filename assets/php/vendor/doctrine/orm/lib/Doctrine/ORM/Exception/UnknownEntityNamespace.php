<?php

declare(strict_types=1);

namespace Doctrine\ORM\Exception;

use LogicException;

use function sprintf;

final class UnknownEntityNamespace extends LogicException implements ConfigurationException
{
    public static function fromNamespaceAlias(string $entityNamespaceAlias): self
    {
        return new self(sprintf(
            'Unknown Entity namespace alias "%s"',
            $entityNamespaceAlias
        ));
    }
}
